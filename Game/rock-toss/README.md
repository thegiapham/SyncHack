# Jacks (Fivestones) 🇬🇧 — webcam edition

A webcam hand-tracking game (like the "67 speed test") built on England's classic
**Jacks / Fivestones** — a childhood game with roots going back to ancient
knucklebones, so it fits the *Games Across Time* theme.

**Goal:** Flick your hand up to toss the **ball** into the air. While it's up,
**scoop up all 5 jacks** from the ground, then **catch the ball** before it lands.
Grab all 5 jacks *and* catch the ball → you win.

## Run it

The camera + hand tracking need a **secure context**, so it will **not** work by
double-clicking the file (`file://`). Serve it over localhost:

```bash
cd rock-toss
python3 -m http.server 8000
```

Then open **http://localhost:8000** in Chrome and allow the camera.

## How to play

1. Hold your hand up — the red ball rests above your palm.
2. **Flick your hand up fast** to toss it (a light movement won't launch it).
3. While it's airborne, sweep your palm over the scattered **jacks** to pick them up.
4. Move your palm under the falling **ball** to catch it (either hand works).
5. All 5 jacks + ball caught → **WIN**. Press **Space** or click to play again.

## Tuning

All difficulty knobs live in the `CONFIG` object at the top of the `<script>` in
`index.html`: `THROW_THRESHOLD` (flick strength), `CATCH_RADIUS`, `GRAB_RADIUS`,
`GRAVITY`, `LAUNCH_MIN/MAX`, `NUM_GROUND` (jack count), `SCATTER_W` (how spread out
the jacks are), `GRAB_ARM_MS` (delay before jacks become grabbable).

## Tech

- MediaPipe `tasks-vision` **HandLandmarker** (2 hands, video mode) via CDN
- Webcam mirrored behind a transparent `<canvas>` that draws the ball/jacks/hands/HUD
- Simple gravity physics; catch = falling ball within `CATCH_RADIUS` of a palm

## Possible next step: progressive rounds

Authentic Jacks is played in rounds — "onesies" (1 jack per toss), "twosies" (2),
"threesies", etc. This build is a single turn; a rounds system could be added on top.

## Plugging into "Games Across Time"

Standalone, but can be linked from a game card in the sibling
`games-across-time-draft` site (e.g. the England / knucklebones artefact).
