# The Archives — Games Across Time

### 🌍 **Live site → https://childgamee.netlify.app**

**A living archive of traditional play.** Explore a world atlas, learn how children have
played across cultures and centuries, and actually *play* the games — several of them with
nothing but your webcam and your hands.

Built for the **SYNCS Hackathon 2026**.

---

## What it is

Most cultural history is something you read. The Archives turns it into something you do.

Open the atlas, pick a marked country, read its archive entry, then play that culture's
traditional game in the browser. Each game you finish stamps your passport. Collect all six
and you unlock a completion certificate.

The atlas covers **30+ countries**. Six of them are playable end to end.

## The games

| Game | Country | How you play it |
|---|---|---|
| **Shagai Horse Race** — Морь Уралдаан | 🇲🇳 Mongolia | Cast four sheep anklebones with a real throwing motion (webcam) or a button |
| **Fanorona** — Fanoron-Tsivy | 🇲🇬 Madagascar | The nine-column board, played on screen |
| **Fukuwarai** — 福笑い | 🇯🇵 Japan | Place the face blindfolded — webcam hand tracking |
| **Agalmata** — Ἀγάλματα (Statues) | 🇬🇷 Greece | Move, then freeze like a statue — webcam motion detection |
| **Jegichagi** — 제기차기 | 🇰🇷 South Korea | Keep the jegi in the air — webcam hand tracking |
| **Jacks / Fivestones** | 🇬🇧 United Kingdom | Toss, scoop the jacks, catch — webcam hand tracking |

> **Webcam games need camera permission.** Nothing is recorded or uploaded — the video
> never leaves your browser; frames are only compared locally to detect motion.

## How the journey works

1. **Choose a culture** from the interactive atlas
2. **Read the archive entry** — the game's history, how it's played, why it matters
3. **Play the game** on its own page
4. **Win the game** — it returns you to the archive and stamps your passport
   (every game page also has a **Mark game complete** button if you want to move on)
5. **Finish all six** and the certificate appears on the world map

Progress is saved in your browser, so you can close the tab and pick up where you left off.

## Languages

The archive interface is translated into **English, 日本語, Tiếng Việt, 中文, and 한국어**,
switchable from the language selector on the landing page.

## Tech

Deliberately plain: **no build step, no framework, no dependencies to install.** Just HTML,
CSS and vanilla JavaScript, so any teammate can open a file and change it.

- **[Leaflet](https://leafletjs.com/)** — the interactive world atlas
- **`getUserMedia` + frame-difference detection** — webcam motion and hand tracking
- **`localStorage`** — passport progress and completion state
- **Netlify** — continuous deploy from `main`

## Project structure

```
Game/
├── games-across-time-draft/     # The Archives — the main site
│   ├── index.html               #   atlas, archive entries, passport, certificate
│   ├── script.js                #   country data, journey flow, i18n, progress
│   ├── styles.css
│   ├── game2.html               #   Fanorona (Madagascar)
│   ├── game3.html               #   Shagai Horse Race (Mongolia)
│   ├── js/complete.js           #   shared "mark game complete" button
│   └── assets/
├── agalmata/                    # Greece
├── fukuwarai/                   # Japan
├── jegichagi/                   # South Korea
└── rock-toss/                   # United Kingdom
```

## Run it locally

Because the games request camera access, open the site over **HTTP, not `file://`** —
browsers block `getUserMedia` on `file://` origins.

```bash
cd Game
python -m http.server 8000
```

Then visit **http://localhost:8000/games-across-time-draft/**.

## Deploying

The site deploys automatically to Netlify on every push to `main`. Configuration lives in
[`netlify.toml`](netlify.toml):

- **Publish directory** is `Game/` — not the repo root, and not the archive folder. All the
  games must share one root so the `../agalmata/` style links between them resolve.
- **`/` redirects** to `/games-across-time-draft/`, the landing page.
