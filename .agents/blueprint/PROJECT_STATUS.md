# Projektin Nykytila & Toimintasuunnitelma (Project Status & Roadmap)

Tämä dokumentti pitää kirjaa projektin todellisesta edistymisestä, havaituista bugeista, teknisestä velasta ja seuraavista kehitysaskeleista. Päivitetään jokaisen kehityssprintin yhteydessä.

---

## 1. Yhteenveto (Executive Status)
- **Projektin tila**: Template valmis ja optimoitu (Skill-First Solo Dev Kit)
- **Valmiusaste arviolta**: 100% (Työkalupakki & Pelirunko valmis)
- **Viimeisin päivitys**: 2026-09-02
- **Kriittisimmät havainnot / Fokus**:
  - Templaatin arkkitehtuuri siivottu Skill-First -malliin.
  - Uudet skillit lisätty: `/test` (automaattitestaus), `/debug` (vianetsintä), `/build` (PWA & jakelu).
  - Utility-kirjasto (`ObjectPool.js`, `math.js`, `Collision.js`) toteutettu ja integroitu.
  - Valmis uuden pelin aloitukseen (`/init`) tai olemassa olevan projektin kartoitukseen (`/onboard`).

---

## 2. Ominaisuusmatriisi (Feature Matrix)

| Osa-alue | Ominaisuus | Tila | Huomiot |
| :--- | :--- | :--- | :--- |
| **Ydin (Core)** | Pelisilmukka & delta-time | 🟩 Valmis | 60 FPS `requestAnimationFrame`, clampattu `dt` |
| **Ydin (Core)** | Pause/Resume & Taustasuojaus | 🟩 Valmis | `visibilitychange` estää lagipiikit välilehden vaihdossa |
| **Ydin (Core)** | Canvas-skaalaus & resoluutio | 🟩 Valmis | Aspect ratio -säilytys, letterbox ja virtuaalikoordinaatit |
| **Ydin (Core)** | Objektipoolit (Object Pool) | 🟩 Valmis | `ObjectPool.js` eliminoidakseen GC-kuorman |
| **Ydin (Core)** | Pelimatematiikka & Fysiikka | 🟩 Valmis | `math.js` (`lerp`, `clamp`, `distanceSq`, `normalize`) |
| **Ydin (Core)** | Törmäystarkistukset | 🟩 Valmis | `Collision.js` (`circleVsCircle`, `rectVsRect`, `circleVsRect`) |
| **Syötteet** | Näppäimistö & Hiiri | 🟩 Valmis | Yhtenäistetty `Input.js` |
| **Syötteet** | Kosketusohjaus / Touch | 🟩 Valmis | On-screen virtuaaliohjaus mobiililaitteille |
| **Grafiikka & UI** | HUD & Overlay-valikot | 🟩 Valmis | Start overlay, popIn-animaatiot, `:root`-värit |
| **Grafiikka & UI** | Partikkelit & Screen Shake | 🟩 Valmis | `ParticleEmitter` käyttää `ObjectPool`ia |
| **Äänet** | Web Audio tehosteet | 🟩 Valmis | 100% koodipohjainen synteesi, tarkka Web Audio -kellotus |
| **Testaus** | Automaattinen selaintestaus | 🟩 Valmis | `/test` (`game-test` skill) |
| **Vianetsintä** | Vikadiagnostiikka & Bugiloki | 🟩 Valmis | `/debug` (`game-debug` skill & `KNOWN_BUGS.md`) |
| **Jakelu** | PWA & itch.io paketointi | 🟩 Valmis | `/build` (`game-deploy` skill) |
| **Muisti** | Sessiomuisti & kontekstinvaihto | 🟩 Valmis | `/save` ja `/resume` (`game-memory` skill) |

*Tilat: 🟩 Valmis | 🟨 Kesken / Työn alla | 🟥 Buginen / Vaatii korjausta | ⬜ Ei aloitettu*

---

## 3. Tekninen velka & Korjatut asiat (Technical Debt)
- [x] Korjattu `ParticleEmitter`: korvattu jatkuva `new` ja `splice()` `ObjectPool`-kierrätyksellä.
- [x] Korjattu välilehden vaihdon lagipiikit: lisätty `visibilitychange` `Engine.js`:ään.
- [x] Korjattu `Audio.js`:n `playWin()`: poistettu epätarkka `setTimeout()` ja siirrytty `AudioContext.currentTime` -aikataulutukseen.
- [x] Korjattu Style Guide -synkronointi: `GameScene.js` lukee värit dynaamisesti CSS:n `:root`-muuttujista.

---

## 4. Seuraavat askeleet (Solo Dev Roadmap)
1. **Kun aloitat uuden pelin**: Kirjoita `/init` käynnistääksesi Grill-Me -haastattelun.
2. **Kun haluat ottaa olemassa olevan koodin haltuun**: Kirjoita `/onboard`.
3. **Kun haluat testata peliä**: Kirjoita `/test`.
