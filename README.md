# HAPPY BIRTHDAY // DARSHAN 🎉

A single-page, responsive **birthday surprise site** with a Valorant-inspired
tactical theme — angular HUD cuts, the signature red on dark navy, condensed
uppercase type, and a **real motorcycle engine** wired to the buttons.

## Run it
Open `index.html` in any browser. No build step, no dependencies.
For the video/audio to load reliably, serve the folder:
```bash
npx serve
```

## Sections
1. **01 // Mission Briefing** — the featured birthday video
2. **02 // Incoming Transmission** — a heartfelt letter (dossier card)
3. **// Mission Complete** — closing wish + `ENGAGE` button (revs the engine + confetti)

## Engine audio 🏍️
Flip **ENGINE AUDIO** on in the top HUD bar. The buttons then play a real
**Yamaha RX-100** rev, with a low **Kawasaki ER-5** idle underneath.
Sound clips are CC-licensed from Wikimedia Commons (`audio/`).

## Customize

| What | Where |
|------|-------|
| **Birthday video** | Replace `video/birthday-video.mp4` (keep the name). |
| **Letter / all text** | Edit `index.html`. |
| **Engine sounds** | Swap the files in `audio/` (`bike.*` = rev, `bike-idle.*` = idle). |
| **Colors** | CSS variables in `:root` at the top of `assets/style.css`. |

## Structure
```
index.html          # all sections & content
assets/style.css    # Valorant-style design system, layout, animations
assets/main.js      # scroll reveals, engine audio, confetti
video/              # birthday-video.mp4
audio/              # bike rev + idle (mp3 + ogg)
```

Built for Darshan. 🎂
