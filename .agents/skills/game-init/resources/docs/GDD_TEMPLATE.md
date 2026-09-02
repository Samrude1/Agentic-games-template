# Game Design Document (GDD): {{GAME_TITLE}}

## 1. Yleiskatsaus (Overview)
- **Nimi**: {{GAME_TITLE}}
- **Genre**: {{GENRE}} (esim. Arcade / Tasoloikka / Räiskintä / Puzzle)
- **Kohdealusta**: Desktop (Web) & Mobile (Touch)
- **Teknologia**: HTML5 Canvas, Vanilla JavaScript (ES Modules), Web Audio API
- **Kohdeyleisö & Teema**: {{THEME}}

---

## 2. Pääpelisilmukka (Core Loop)
1. **Toiminto**: Pelaaja ohjaa...
2. **Haaste**: Välttele / Kerää / Tuhoa...
3. **Palkinto**: Pisteet / Power-upit / Eteneminen...
4. **Lopputulos**: Piste-ennätys tai tason läpäisy.

---

## 3. Pelaajan ohjaus & Kontrollit (Controls)
- **Näppäimistö**:
  - Liikkuminen: Nuolinäppäimet / WASD
  - Toiminto 1 (Hyppy / Ammunta): Välilyönti
  - Toiminto 2: Z / Shift
  - Pause: Esc / P
- **Mobiili / Kosketus**:
  - Virtuaalinen D-pad / Joystick vasemmalla
  - Toimintonapit (A / B) oikealla
- **Hiiri**: (jos osoitin- tai tähtäyspeli)

---

## 4. Visuaalinen tyyli & Äänimaailma
- **Resoluutio**: 960x540 (16:9 widescreen) virtuaaliresoluutio, automaattinen aspect-ratio skaalaus.
- **Graafinen ilme**: {{VISUAL_STYLE}} (esim. Neon Glow / Minimal Vector / Retro Pixel Art).
- **Äänitehosteet**: Proseduraaliset Web Audio API -äänet (Laser, Hyppy, Osuma, Räjähdys, Piste).

---

## 5. Pelimekaniikat ja säännöt
- **Pelaajan ominaisuudet**: Nopeus, elämät/kesto, erikoiskyvyt.
- **Viholliset / Esteet**: Liikeradat, kesto, käyttäytymismallit.
- **Voitto- ja häviöehdot**:
  - Häviö: Elämät loppuvat / aikaraja täyttyy.
  - Voitto: Tavoite saavutettu / aallot selvitetty.

---

## 6. Tekninen arkkitehtuuri
- `src/core/Engine.js`: 60 FPS pelisilmukka ja canvas-skaalaus
- `src/core/Input.js`: Multi-input abstraktio
- `src/core/Audio.js`: Äänisynteesi
- `src/scenes/`: Skenerakenne (Menu, Game, GameOver)
