# ComfyUI workflows

ComfyUI workflows used to generate The Magic Emporium's art: the painted backgrounds behind modifier tiers (`apps/core/public/backgrounds/`) and item icons. They replace the old Leonardo AI setup.

All workflows are in ComfyUI's **API format** (`*.api.json`) under [`workflows/`](workflows). Drag one onto the ComfyUI canvas to open it, or run it with `comfy run --workflow tools/comfy/workflows/<file>`.

```
tools/comfy/
├── workflows/   ComfyUI workflows (*.api.json)
├── styles/      style reference images, uploaded to ComfyUI's input folder
├── icons/       clean source icons, their render scripts, and item-icons.json (every item icon's prompt)
├── scripts/     item_icon.py: generate or repaint an item icon and its cutout in one command
└── out/         script output: previews, backups, filled-in workflows (git-ignored)
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
| [`item-icon.api.json`](workflows/item-icon.api.json) | `output/tme/icon_*.png`, `output/tme/icon_cutout_*.png` | Paints a new item icon on a coloured brush-burst background, as a rough, low-detail concept sketch, and also saves its transparent cutout. |
| [`item-repaint.api.json`](workflows/item-repaint.api.json) | `output/tme/repaint_*.png`, `output/tme/repaint_cutout_*.png` | Edits an existing item icon from a one-line instruction (new material, colours, a fixed part) while keeping its outline and composition, and also saves its transparent cutout. |
| [`item-recompose.api.json`](workflows/item-recompose.api.json) | `output/tme/recompose_*.png`, `output/tme/recompose_cutout_*.png` | Redraws an existing item icon in a new pose from a one-line `Pose:` (keeping its design, colours and background) so only its lower end leaves the image, at the bottom, and also saves its transparent cutout. |
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

### Item icons

Item icons live in `apps/core/public/icons/` as `<name>.jpg`, with a transparent `<name>.cutout.png` next to each (the item card's breakout art, see `getCutoutUrl`). Every icon's prompt is kept in [`icons/item-icons.json`](icons/item-icons.json), so any icon can be regenerated or tweaked later.

#### Running it

[`scripts/item_icon.py`](scripts/item_icon.py) does the whole loop for one icon: uploads the references, fills in the workflow, runs it on the local ComfyUI, saves `<name>.jpg` and `<name>.cutout.png`, backs up the old files to `out/backups/` and writes a preview sheet to `out/previews/<name>.jpg` (icon, cutout on a checkerboard, 64px and 40px).

```sh
python3 tools/comfy/scripts/item_icon.py melee/martial/glaive             # rerun from item-icons.json
python3 tools/comfy/scripts/item_icon.py melee/martial/glaive --seed 7    # same prompt, new variation
python3 tools/comfy/scripts/item_icon.py melee/martial/pike --repaint "make the head polished gold"
python3 tools/comfy/scripts/item_icon.py melee/martial/longsword --recompose "the sword points down, ..."
```

To make a new icon or rework one, edit its entry in `item-icons.json` first, then run the script. Entries use one of two methods:

- **`generate`** ([`item-icon.api.json`](workflows/item-icon.api.json)) paints a brand-new icon from `item` (the prompt's `Item:` line) and `palette`. Use it when the old icon is bad or you want a new design.
- **`repaint`** ([`item-repaint.api.json`](workflows/item-repaint.api.json)) edits the **current** icon from an `instruction` and keeps its outline, crop and composition. Use it when the shape is good and only the material, colours or one part need to change ("outline is great, texture is terrible"). A `generate` entry can carry a follow-up `repaint` to fix one detail of the generated image.
- **`recompose`** ([`item-recompose.api.json`](workflows/item-recompose.api.json)) redraws the **current** icon in a new pose from a `pose` line, keeping its design, colours and background. Use it when the design is good but the item runs off the wrong border. A `generate` entry can carry a follow-up `recompose` (run before any follow-up `repaint`).

Always look at the preview sheet: the cutout on the checkerboard and the 40px icon. If a result is clearly bad, change the prompt or seed and run again.

#### item-icon

1. **Style references** load the base style `rough-brush.jpg` (from [`styles/`](styles)) and the two roughest finished icons, `warhammer.jpg` and `greatsword.jpg` (from `apps/core/public/icons/melee/martial/`). Avoid polished icons such as `plate.jpg` as references, because they pull the result towards fine detail.
2. **Nano Banana 2.1** paints the item as a rough, low-detail concept sketch, as a close crop of its most recognisable part filling 80–90% of the frame, on a burst of saturated strokes that fills the whole background.
3. **SaveImage** writes the icon; **Recraft Remove Background** cuts the same image out and a second **SaveImage** writes the cutout.

Only the `Item:` and `Use following color palette:` lines change per icon; the rest of the prompt is the approved baseline. Don't loosen its style or composition rules.

#### item-repaint

1. **Icon to repaint** loads the current icon; **Style reference** loads `rough-brush.jpg`.
2. **Nano Banana 2.1** keeps the composition, crop, outline and background, and only applies the `Instruction:` line.
3. Same two outputs as `item-icon`.

The repaint keeps the old background unless the instruction says otherwise, so if the old background is the problem (an item the same colour as its background), say so explicitly: "Recolour the whole background … fill the ENTIRE frame edge to edge with …".

#### item-recompose

1. **Icon to recompose** loads the current icon; **Style reference** loads `rough-brush.jpg`.
2. **Nano Banana 2.1** redraws the same item in the `Pose:` line's pose, with the top, left and right borders left clear and only the item's lower end running off the bottom border. It draws the item smaller if it would not fit otherwise.
3. Same two outputs as `item-icon`.

The model tends to keep the source image's scale, so a long item can still run off the top. If it does, say so in the pose ("draw the sword a little SMALLER … a clear band of background between the pommel and the top border"), or recompose from the original rather than from an earlier recompose.

#### What makes a good icon

The look the set is going for (see `clothes/royal.jpg`, `melee/martial/glaive.jpg`, `melee/martial/battleaxe.jpg`, `melee/simple/greatclub.jpg`):

- **Rough, not detailed.** Big flat planes of colour, chunky dry-brush strokes; chain links, scales, wood grain and engravings only hinted at. Polished rendering, fine linework and texture detail are the most common failure. If a repaint comes out too clean, add an explicit block: "VERY ROUGH, LOW DETAIL: big flat planes of colour blocked in with a few chunky dry-brush strokes. No wood grain, no fine texture, no small scratches, no rivets, no polished rendering."
- **Only the bottom border may cut the item.** The item card shows the cutout breaking out of the card, so a cut along the top, left or right border shows as a hard, ugly edge. Long items point down (a sword's hilt at the top, its blade running off the bottom). `item-icon.api.json`'s composition rule still allows any border, so check new icons and fix them with `recompose`.
- **Zoom: close crop, not the whole item.** The icons are shown small, so a whole sword squeezed into the frame is unreadable. Show the most recognisable part filling 80–90% of the frame and let the rest run off the border: a sword's hilt and upper blade, an axe head with the top of the haft, a coat from collar to waist, a chestpiece without sleeves. Don't go further than that (just a shoulder stops reading as a coat). Small items (handaxe, light hammer, dagger) can be shown whole, as long as they fill the frame.
- **One bold idea per item.** The best icons have a single twist that reads at 40px: a crystal blade, a blood-moon double axe, a black hole warping an energy blade, a giant dragon skull on a tiny stick, an iron skull flail, gold wings as trident prongs. Say the proportions out loud when they matter ("GIANT skull on a TINY stick, like a popsicle; the stick comes out where the spine would be").
- **Armour:** a close-up chestpiece at a slight three-quarter angle reads much better than a full suit with sleeves and legs.
- **Inspiration images** (e.g. Guild Wars 2 wiki icons) are for us, not the model: look at them, then describe the shape, materials and colours in words in the `Item:` line. Don't feed them to the workflow.

#### What makes a clean cutout

Recraft decides what is "item" and what is "background" from contrast and shape. Every cutout problem so far came from one of these:

- **Contrast.** Name the item's colours, then two background colours that clearly differ from them (pale bone or ice on deep red/violet; dark iron on mint; gold on blue or teal; red fire on blue). An item in the same hue as its background (a maroon club on maroon) loses half its outline.
- **Fill the frame with background.** A compact burst floating on black is treated as part of the item and stays in the cutout. The workflow prompt already asks for strokes filling the entire frame; repeat it in a repaint instruction if needed.
- **Parts running off the border must be bold.** A plain grey blade fading off the edge is cut away as background. Make it bright and outlined: "bold, solid, brilliant white-silver with a gold-edged outline, clearly part of the item".
- **Keep effects tight and solid.** Glows, flames and magic must hug the item and be opaque ("the glow stays inside the crystal", "a thin, tight, solid band of flames that clings to the edges", "no loose sparks, embers or smoke"). Loose flames drag background strokes into the cutout; faint magic wisps either vanish or turn into a pale haze.
- **Nothing small and floating.** Floating shards, sparks and particles get dropped. Separate floating parts work only if each one is big and solid (the rapier's grip, guard and blade).
- **Thin details need weight.** Spider legs, chains and filigree survive when they are thick and chunky; a little background colour inside pierced shapes (filigree holes, between teeth) is fine.

- **Seed:** change it to get variations of the same prompt. The partner models aren't fully deterministic, so a rerun with the same seed can still differ a little.

## Base style

Every image uses the same look: **rough, painterly concept art sketches**.

- Bold, loose dry-brush strokes with visible bristle texture
- Chunky, angular brushwork that radiates outward in bursts
- Scattered paint specks and splatter
- The subject is mostly flat with little interior detail, set inside the strokes (backgrounds and edge strips use a dark silhouette; item icons use the item's own colours, see [Item icons](#item-icons))
- A limited, saturated palette of two or three colours per image, chosen for the item's theme
- No text, borders or frames

The reference images that define this style are kept in [`styles/`](styles):

| File | Source |
| --- | --- |
| `styles/rough-brush.jpg` | `backgrounds/tertiary/unendingSelfImmolation.jpg` |

The style reference is only used for rendering. The prompt explicitly tells the model not to copy its subject or composition, so the subject comes entirely from the description.

## Setup

1. Install comfy-cli and start the local ComfyUI on `127.0.0.1:8188`. `item_icon.py` finds `comfy` on the `PATH`, in `$COMFY_BIN`, or at `~/.local/share/uv/tools/comfy-mcp/bin/comfy` (where the comfy-mcp tool installs it).
2. Store a Comfy API key (create one at <https://platform.comfy.org/profile/api-keys>). The Gemini and Recraft nodes are **partner API nodes**, so every run spends Comfy credits:
   ```sh
   comfy cloud set-key --key <your-key>
   ```
   With a key stored, comfy-cli sends runs to Comfy Cloud by default, which the free tier refuses (`FREE_TIER_NOT_ALLOWED`). Always run with `--where local`; `item_icon.py` already does.
3. For the other workflows, upload the style references into ComfyUI's `input` folder, keeping their filenames (`LoadImage` looks them up by name). `item_icon.py` uploads its own references.
   ```sh
   comfy upload tools/comfy/styles/*.jpg --overwrite
   ```
4. For `modifier-icon`, also upload the source icons:
   ```sh
   comfy upload tools/comfy/icons/modifiers/*.png --overwrite
   ```
