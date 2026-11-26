"""Generate or repaint item icons and their cutouts with ComfyUI.

Each icon's prompt lives in tools/comfy/icons/item-icons.json, keyed by its
path under apps/core/public/icons/ without the extension:

    "melee/martial/glaive": {
        "method": "generate",            # item-icon.api.json: paint a new icon
        "seed": 42,
        "item": "...",                   # the prompt's "Item:" line
        "palette": "...",                # the prompt's colour palette line
        "recompose": {"seed": 42, "pose": "..."},        # optional follow-up recompose
        "repaint": {"seed": 42, "instruction": "..."},   # optional follow-up repaint
        "notes": "..."
    }
    "melee/martial/pike": {
        "method": "repaint",             # item-repaint.api.json: edit the current icon
        "seed": 42,
        "instruction": "..."
    }
    "melee/martial/greatsword": {
        "method": "recompose",           # item-recompose.api.json: redraw the current icon in a new pose
        "seed": 42,
        "pose": "..."                    # the prompt's "Pose:" line
    }

Usage (from the repo root, ComfyUI running on 127.0.0.1:8188):

    python3 tools/comfy/scripts/item_icon.py melee/martial/glaive
    python3 tools/comfy/scripts/item_icon.py melee/martial/glaive --seed 7
    python3 tools/comfy/scripts/item_icon.py melee/martial/pike --repaint "make the head gold"
    python3 tools/comfy/scripts/item_icon.py melee/martial/longsword --recompose "the sword points down"

It overwrites <key>.jpg and <key>.cutout.png in apps/core/public/icons/, backs
up the previous files and writes a preview sheet (icon, cutout on a
checkerboard, 64px and 40px) to tools/comfy/out/. Every run spends partner
credits (Nano Banana + Recraft).
"""

import argparse
import io
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parents[3]
ICONS = REPO / "apps/core/public/icons"
COMFY_DIR = REPO / "tools/comfy"
OUT = COMFY_DIR / "out"
PROMPTS = COMFY_DIR / "icons/item-icons.json"
COMFY = os.environ.get("COMFY_BIN") or shutil.which("comfy") or str(Path.home() / ".local/share/uv/tools/comfy-mcp/bin/comfy")
SERVER = "http://127.0.0.1:8188"

GENERATE_REFS = {
    "1": COMFY_DIR / "styles/rough-brush.jpg",
    "2": ICONS / "melee/martial/warhammer.jpg",
    "3": ICONS / "melee/martial/greatsword.jpg",
}


def upload(path: Path, name: str) -> None:
    subprocess.run(
        ["curl", "-sf", "-F", f"image=@{path};filename={name}", "-F", "overwrite=true", f"{SERVER}/upload/image"],
        check=True,
        capture_output=True,
    )


def replace_line(prompt: str, prefix: str, value: str) -> str:
    lines = prompt.split("\n")
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    if len(hits) != 1:
        sys.exit(f"Expected exactly one line starting with {prefix!r} in the workflow prompt")
    lines[hits[0]] = f"{prefix} {value}"
    return "\n".join(lines)


def generate_workflow(flat: str, seed: int, item: str, palette: str) -> dict:
    wf = json.loads((COMFY_DIR / "workflows/item-icon.api.json").read_text())
    for node, ref in GENERATE_REFS.items():
        name = "tme_ref_" + ref.name
        upload(ref, name)
        wf[node]["inputs"]["image"] = name
    prompt = wf["4"]["inputs"]["prompt"]
    prompt = replace_line(prompt, "Item:", item)
    prompt = replace_line(prompt, "Use following color palette:", palette)
    wf["4"]["inputs"]["prompt"] = prompt
    wf["4"]["inputs"]["seed"] = seed
    wf["5"]["inputs"]["filename_prefix"] = f"tme/icons/{flat}"
    wf["7"]["inputs"]["filename_prefix"] = f"tme/icons/{flat}_cutout"
    return wf


# Workflows that edit the current icon: (workflow file, prompt line their payload replaces).
EDITS = {
    "repaint": ("item-repaint.api.json", "Instruction:"),
    "recompose": ("item-recompose.api.json", "Pose:"),
}


def edit_workflow(method: str, flat: str, seed: int, source: Path, value: str) -> dict:
    workflow, prefix = EDITS[method]
    wf = json.loads((COMFY_DIR / "workflows" / workflow).read_text())
    src_name = f"tme_src_{flat}.jpg"
    upload(source, src_name)
    style = COMFY_DIR / "styles/rough-brush.jpg"
    upload(style, "tme_ref_" + style.name)
    wf["1"]["inputs"]["image"] = src_name
    wf["2"]["inputs"]["image"] = "tme_ref_" + style.name
    wf["4"]["inputs"]["prompt"] = replace_line(wf["4"]["inputs"]["prompt"], prefix, value)
    wf["4"]["inputs"]["seed"] = seed
    wf["5"]["inputs"]["filename_prefix"] = f"tme/icons/{flat}_{method}"
    wf["7"]["inputs"]["filename_prefix"] = f"tme/icons/{flat}_{method}_cutout"
    return wf


def run(wf: dict, flat: str) -> tuple[bytes, bytes]:
    path = OUT / "workflows" / f"{flat}.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(wf, indent=2))
    # --where local: with a stored API key comfy-cli otherwise routes the run to Comfy Cloud.
    proc = subprocess.run(
        [COMFY, "run", "--workflow", str(path), "--where", "local", "--wait", "--allow-spend",
         "--no-notify", "--no-watch", "--timeout", "600", "--json"],
        capture_output=True,
        text=True,
    )
    envelopes = [json.loads(line) for line in proc.stdout.splitlines() if line.startswith("{") and '"envelope"' in line]
    if not envelopes:
        sys.exit(f"comfy run produced no result:\n{proc.stdout}\n{proc.stderr}")
    env = envelopes[-1]
    if not env["ok"]:
        sys.exit(f"comfy run failed: {env['error']['message']}\n{env['error'].get('hint', '')}")
    outputs = env["data"]["outputs_by_node"]
    icon = urllib.request.urlopen(outputs["5"][0]).read()
    cutout = urllib.request.urlopen(outputs["7"][0]).read()
    return icon, cutout


def save(key: str, icon: bytes, cutout: bytes) -> None:
    jpg = ICONS / f"{key}.jpg"
    png = ICONS / f"{key}.cutout.png"
    backup = OUT / "backups" / time.strftime("%Y%m%d-%H%M%S")
    for f in (jpg, png):
        if f.exists():
            target = backup / f.relative_to(ICONS)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, target)
    img = Image.open(io.BytesIO(icon)).convert("RGB")
    if img.size != (1024, 1024):
        img = img.resize((1024, 1024), Image.LANCZOS)
    img.save(jpg, quality=92)
    png.write_bytes(cutout)


def preview(key: str) -> Path:
    size = 512
    checker = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    for y in range(0, size, 32):
        for x in range(0, size, 32):
            if (x + y) // 32 % 2:
                checker.paste((190, 190, 190, 255), (x, y, x + 32, y + 32))
    checker.alpha_composite(Image.open(ICONS / f"{key}.cutout.png").convert("RGBA").resize((size, size)))
    icon = Image.open(ICONS / f"{key}.jpg").convert("RGB")
    sheet = Image.new("RGB", (size * 2 + 96, size), "white")
    sheet.paste(icon.resize((size, size)), (0, 0))
    sheet.paste(checker.convert("RGB"), (size, 0))
    sheet.paste(icon.resize((64, 64)), (size * 2 + 16, 16))
    sheet.paste(icon.resize((40, 40)), (size * 2 + 28, 100))
    path = OUT / "previews" / f"{key.replace('/', '_')}.jpg"
    path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(path)
    return path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("key", help="icon path under apps/core/public/icons/ without extension, e.g. melee/martial/glaive")
    parser.add_argument("--seed", type=int, help="override the seed from item-icons.json")
    parser.add_argument("--repaint", metavar="INSTRUCTION", help="repaint the current icon with this instruction instead of using item-icons.json")
    parser.add_argument("--recompose", metavar="POSE", help="redraw the current icon in this pose instead of using item-icons.json")
    parser.add_argument("--skip-followup", action="store_true", help="for generate entries, skip their follow-up recompose and repaint")
    args = parser.parse_args()

    flat = args.key.replace("/", "_")
    entries = json.loads(PROMPTS.read_text())
    entry = entries.get(args.key)
    current = ICONS / f"{args.key}.jpg"

    if args.repaint:
        steps = [("repaint", args.seed or 42, args.repaint)]
    elif args.recompose:
        steps = [("recompose", args.seed or 42, args.recompose)]
    elif entry is None:
        sys.exit(f"No entry for {args.key!r} in {PROMPTS.relative_to(REPO)}; add one first.")
    elif entry["method"] == "repaint":
        steps = [("repaint", args.seed or entry["seed"], entry["instruction"])]
    elif entry["method"] == "recompose":
        steps = [("recompose", args.seed or entry["seed"], entry["pose"])]
    else:
        steps = [("generate", args.seed or entry["seed"], (entry["item"], entry["palette"]))]
        if not args.skip_followup:
            if "recompose" in entry:
                steps.append(("recompose", entry["recompose"]["seed"], entry["recompose"]["pose"]))
            if "repaint" in entry:
                steps.append(("repaint", entry["repaint"]["seed"], entry["repaint"]["instruction"]))

    for method, seed, payload in steps:
        if method == "generate":
            wf = generate_workflow(flat, seed, *payload)
        else:
            wf = edit_workflow(method, flat, seed, current, payload)
        icon, cutout = run(wf, flat)
        save(args.key, icon, cutout)
        print(f"{method} ok: {args.key} (seed {seed})")

    print(f"preview: {preview(args.key)}")


if __name__ == "__main__":
    main()
