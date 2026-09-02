# Tiedossa olevat Bugit & Viat (KNOWN_BUGS.md)

Tämä tiedosto pitää kirjaa havaituista, tutkittavista ja korjatuista bugeista osana `/debug` (`game-debug`) -työnkulkua.

---

## 🟢 Korjatut ongelmat (Resolved Issues)

| Pvm | Komponentti | Vian kuvaus | Perussyy (Root Cause) | Ratkaisu |
| :--- | :--- | :--- | :--- | :--- |
| 2026-09-02 | `State.js` / `ParticleEmitter` | Partikkelit aiheuttivat GC-kuormaa | Uusien olioiden luonti ja `splice()` pelisilmukassa | Korvattu `ObjectPool`-toteutuksella |
| 2026-09-02 | `Engine.js` | Lagipiikit taustalle siirryttäessä | Välilehden vaihto aiheutti suuren dt-hypyn | Lisätty `visibilitychange` automaattisella pausetuksella ja aikanollauksella |
| 2026-09-02 | `Audio.js` | `playWin()` ajoitus epätarkka | Käytti `setTimeout()`-funktiota Web Audion oman kellon sijaan | Korjattu käyttämään `AudioContext.currentTime` -aikataulutusta |
| 2026-09-02 | `GameScene.js` | Kovakoodatut värit rikkoivat Style Guidea | Värit olivat kiinteitä heksoja koodissa | Synkronoitu lukemaan `:root`-muuttujat `getComputedStyle`:lla |

---

## 🔴 Avoimet havainnot (Open Issues)

*Ei aktiivisia raportoituja bugeja tällä hetkellä.*
