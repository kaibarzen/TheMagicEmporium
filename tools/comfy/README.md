# ComfyUI workflows

ComfyUI workflows used to generate The Magic Emporium's art: the painted backgrounds behind modifier tiers (`apps/core/public/backgrounds/`) and item icons. They replace the old Leonardo AI setup.

All workflows are in ComfyUI's **API format** (`*.api.json`) under [`workflows/`](workflows). Drag one onto the ComfyUI canvas to open it, or run it with `comfy run --workflow tools/comfy/workflows/<file>`.

```
tools/comfy/
├── workflows/   ComfyUI workflows (*.api.json)
├── styles/      style reference images, uploaded to ComfyUI's input folder
└── icons/       clean source icons and the scripts that render them
```

## Partner nodes only

Generation runs on **partner API nodes** (Nano Banana, Recraft, …) through the local ComfyUI. Keep the local side lightweight:

- No local checkpoints, diffusion models or LoRAs. Image generation always goes through a partner node.
- Small local helper models are fine, such as a background remover (BiRefNet `RemoveBackground`). For cutouts, prefer `RecraftRemoveBackgroundNode`, though: it gave much cleaner edges.
- Don't download large models or install heavy custom node packs to make a workflow run.
- Don't provision anything that costs money beyond the per-run partner credits: no Comfy Cloud runs, rented GPUs or other hosted compute. Run with `--where local`, since a stored API key otherwise makes comfy-cli send runs to Comfy Cloud.

If no partner node can do a job, ask before reaching for anything else.

## Workflows

| File | Output | What it does |
| --- | --- | --- |
| [`armor-background.api.json`](workflows/armor-background.api.json) | `output/tme/armor_*.png` | Generates a single 1:1 armor background from a text description, styled after the base style. |
| [`background-edge.api.json`](workflows/background-edge.api.json) | `output/tme/edge_*.png` | Generates a wide strip for the top or bottom edge of an item card (`appearance.background.top`/`bottom`) and cuts it out to a transparent PNG. |
| [`background-edge-tentacle.api.json`](workflows/background-edge-tentacle.api.json) | `output/tme/edge_tentacle_*.png` | `background-edge` preset: bright purple octopus arms curling up from the bottom edge. |
| [`background-edge-ice.api.json`](workflows/background-edge-ice.api.json) | `output/tme/edge_ice_*.png` | `background-edge` preset: a sheet of bright, icy blue ice breaking apart along the bottom edge. |
| [`background-edge-blood.api.json`](workflows/background-edge-blood.api.json) | `output/tme/edge_blood_*.png` | `background-edge` preset: bright red blood running down from the top edge in long drips. |
| [`background-edge-skulls.api.json`](workflows/background-edge-skulls.api.json) | `output/tme/edge_skulls_*.png` | `background-edge` preset: a heap of bone-ivory skulls piled along the bottom edge. |
| [`background-edge-eyes.api.json`](workflows/background-edge-eyes.api.json) | `output/tme/edge_eyes_*.png` | `background-edge` preset: two huge, bloodshot eyes staring at the viewer over the bottom edge, in extreme close-up. |
| [`background-edge-eyes-drained.api.json`](workflows/background-edge-eyes-drained.api.json) | `output/tme/edge_eyes_drained_*.png` | `background-edge` preset: the creepy eyes again, but blank and milky white, with pale wisps of soul pouring out of them. |
| [`background-edge-eyeballs.api.json`](workflows/background-edge-eyeballs.api.json) | `output/tme/edge_eyeballs_*.png` | `background-edge` preset: cosmic horror, a mound of stacked eyeballs of every size along the bottom edge, all staring at the viewer. |
| [`modifier-icon.api.json`](workflows/modifier-icon.api.json) | `output/tme/modifier_*.png` | Repaints an existing modifier icon (linear, unique, …) in the base style, cut out to a transparent PNG. |
| [`item-cutout.api.json`](workflows/item-cutout.api.json) | `output/tme/cutout_*.png` | Cuts an existing item image out of its painted background into a transparent PNG with Recraft Remove Background. |
| [`item-ink-dissolve.api.json`](workflows/item-ink-dissolve.api.json) | `output/tme/dissolve_*.png` | Repaints an existing item so the parts cut off by the image border dissolve into dry-brush strokes and splatter instead, then cuts it out to a transparent PNG. |
| [`weapon-icon.api.json`](workflows/weapon-icon.api.json) | `output/tme/weapon_*.png` | Generates a weapon icon from three weapon style references and cuts it out to a transparent PNG with Recraft Remove Background. |

### armor-background

1. **Style reference** loads `rough-brush.jpg`.
2. **Nano Banana 2.1** (`GeminiNanoBanana2V2`) generates the image at 1:1, 1K, medium thinking level.
3. **SaveImage** writes it to `output/tme/armor_*.png`.

For each new piece, edit these two lines of the prompt:

```
Description: A silhouette of a breastplate, 45 degree angle, close up
Use following color palette: mystical bright gold, mystic blood red background
```

Change the seed to get variations of the same prompt.

### background-edge

Edge images sit along the top or bottom of an item card, in front of the background art (`appearance.background.top` / `.bottom`). The card stretches them to its width at their own proportions, crops them to 60% of its height and fades their inner side, so the strip only needs a ragged silhouette along one edge.

1. **Style reference** loads `rough-brush.jpg`.
2. **Nano Banana 2.1** generates a 21:9 strip: a dark silhouette growing from one edge, on flat white.
3. **Recraft Remove Background** (partner node) cuts the white away.
4. **SaveImage** writes a transparent PNG to `output/tme/edge_*.png`.

For each new strip, edit these lines of the prompt:

```
Edge: bottom
Description: Jagged rubble, broken stones and a few cracked pillar fragments, half swallowed by low, creeping mist
Use following color palette: near-black blue-violet, faint cold violet rim light
```

A fixed **Mood** line keeps every strip dark and mysterious: deep shadow, as if at the edge of torchlight, with only a faint, eerie glow on the rim.

- **Edge** is `top` or `bottom`. Describe things that belong on that edge: a cave ceiling, stalactites, hanging roots or chains for `top`; rubble, mist, grass, bones or a dark ground for `bottom`. Don't flip a bottom strip to get a top one, because gravity reads wrong.
- **Palette:** keep the silhouette dark. The card dims its background further, and a bright strip competes with the text. One faint rim-light colour taken from the background art helps the strip sit in front of it.
- **Seed:** change it to get variations of the same prompt.

Finished example strips live in [`packages/ui/src/fixtures/items/edges/`](../../packages/ui/src/fixtures/items/edges), where the item card stories use them. To give a background its own edges in the module, save them next to it as `<name>.top.png` / `<name>.bottom.png` (for example `apps/core/public/backgrounds/redBloodSkull.top.png`); cards left on `AUTO` pick them up.

#### Presets

`background-edge-tentacle`, `background-edge-ice`, `background-edge-blood` and `background-edge-skulls` are copies of `background-edge` with their own description and palette already filled in. Unlike the base workflow they are **bright**: they have no Mood line and paint a brightly coloured shape instead of a dark silhouette.

`background-edge-eyes`, `background-edge-eyes-drained` and `background-edge-eyeballs` keep the base workflow's dark look but swap its Mood line for a creepy (eyes) or cosmic horror (eyeballs) one, and let the eyes be the one detailed part of the otherwise flat, shadowed subject. The ice, skulls, eyeballs and drained eyes presets paint on flat **black** instead of white, because pale ice, bone, eyeballs and glowing wisps on white cut out badly. Blood is set to `Edge: top`, so it runs down from the top of the card; the others are set to `Edge: bottom`. Switch the line to put a strip on the other edge. If you improve the shared parts of the prompt (style, layout), copy the change into every `background-edge*` file.

### modifier-icon

1. **Source icons** load the four clean modifier icons (`linear.png`, `unique.png`, `tiered.png`, `independent.png`) from [`icons/modifiers/`](icons/modifiers). Each one is placed on a flat white canvas by its own **on white** node. Only one is connected at a time (`linear` by default); to repaint another, drag its **on white** output into the Nano Banana `image_1` input.
2. **Style reference** loads `rough-brush.jpg`.
3. **Nano Banana 2.1** repaints the icon, keeping its shape and colours but using the base style's brushwork, on a flat white background.
4. **Recraft Remove Background** (partner node) cuts the white away. It gave much cleaner edges than the local BiRefNet `RemoveBackground`.
5. **SaveImage** writes a transparent PNG to `output/tme/modifier_*.png`.

There is no prompt to edit per icon: the shape and colours come from the source image.

#### Clean source icons

`icons/modifiers/*.png` are 1024px transparent renders of `apps/core/public/icons/modifiers/*.svg` **without the soft halo**, which the model otherwise tries to paint as a smudge. Regenerate them with:

```sh
python3 tools/comfy/icons/render_modifier_icons.py tools/comfy/icons/modifiers
```

The shapes are hard-coded from the SVGs, so update the script if an SVG changes.

#### Foundry feat icons

`apps/core/public/icons/modifiers/*.png` (the icons on modifier feats in Foundry) are the item card's brush characters, not ComfyUI output. Regenerate them with the [Ma Shan Zheng](https://fonts.google.com/specimen/Ma+Shan+Zheng) font file:

```sh
python3 tools/comfy/icons/render_modifier_marks.py <MaShanZheng-Regular.ttf> apps/core/public/icons/modifiers
```

The characters and colours are hard-coded to match `ModifierMark` in the modifier displays, so update the script if those change.

## Base style

Every image uses the same look: **rough, painterly concept art sketches**.

- Bold, loose dry-brush strokes with visible bristle texture
- Chunky, angular brushwork that radiates outward in bursts
- Scattered paint specks and splatter
- The subject is a dark, mostly flat silhouette with little interior detail, set inside the strokes
- A limited, saturated palette of two or three colours per image, chosen for the item's theme
- No text, borders or frames

The reference images that define this style are kept in [`styles/`](styles):

| File | Source |
| --- | --- |
| `styles/rough-brush.jpg` | `backgrounds/tertiary/unendingSelfImmolation.jpg` |

The style reference is only used for rendering. The prompt explicitly tells the model not to copy its subject or composition, so the subject comes entirely from the description.

## Setup

1. Upload the style references into ComfyUI's `input` folder, keeping their filenames (`LoadImage` looks them up by name):
   ```sh
   comfy upload tools/comfy/styles/*.jpg --overwrite
   ```
2. For `modifier-icon`, also upload the source icons:
   ```sh
   comfy upload tools/comfy/icons/modifiers/*.png --overwrite
   ```
3. Log in to Comfy with an API key. The Gemini nodes are **partner API nodes**, so every run spends Comfy credits.
