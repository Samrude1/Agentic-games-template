# HTML/CSS/JS Pelinkehityksen Perussäännöt ja Standardit

Nämä säännöt ohjaavat kaikkea pelinkehitystä tässä ympäristössä. Agentin tulee noudattaa näitä periaatteita koodia generoidessaan ja refaktoroidessaan.

---

## 1. Arkkitehtuuri & Teknologiavalinnat
- **Alusta**: Puhdas HTML5 Canvas (tai DOM tarvittaessa), Moderni Vanilla JavaScript (ES Modules `type="module"`), Vanilla CSS.
- **Riippuvuudet**: Vältä turhia ja raskaita ulkoisia kirjastoja (kuten Phaser, Pixi, Lodash), ellei käyttäjä erikseen pyydä. Kevyet matematiikka- tai fysiikkakirjastot ovat sallittuja vain tarvittaessa.
- **Modulaarisuus**: Jaa koodi loogisiin moduuleihin:
  - `src/core/` (Pelisilmukka, syötteiden luku, äänet, tilanhallinta)
  - `src/scenes/` (Valikot, pelitilat, game over)
  - `src/entities/` (Pelaaja, viholliset, ammukset, kerättävät esineet)
  - `src/utils/` (Vektorimatematiikka, törmäystarkistukset, apufunktiot)

---

## 2. Pelisilmukka & Ajoitus (Game Loop)
- Käytä aina `requestAnimationFrame`-silmukkaa.
- **Delta-Time (`dt`)**: Kaikki fysiikka, liikkeet ja animaatiot on sidottava `dt`:hen (sekunneissa):
  ```javascript
  position.x += velocity.x * dt;
  ```
- **Clamp Delta-Time**: Rajoita maksimi `dt` (esim. `Math.min(dt, 0.1)`), jotta peli ei hajoa välilehden vaihdon tai pitkän lagipiikin seurauksena.
- Tue haluttaessa kiinteää fysiikka-askelta (Fixed Timestep Accumulator, esim. 60 Hz) jos peli vaatii determinististä fysiikkaa (esim. tarkka tasoloikka).

---

## 3. Responsiivinen Canvas & Skaalaus
- **Virtuaaliresoluutio**: Määritä pelille sisäinen resoluutio (esim. 960x540 tai 800x600 widescreen, tai 480x800 pystypeleille).
- **Kuvasuhteen säilytys (Aspect Ratio)**:
  - Canvas skaalataan CSS:llä tai JS-resize-handlerilla näyttöön säilyttäen kuvasuhteen (letterbox / pillarbox).
  - Estä sumea kuva: Retinanäytöillä huomioi `window.devicePixelRatio`, ja pikselipeleissä aseta `imageSmoothingEnabled = false` ja CSS `image-rendering: pixelated`.
- **Kosketusalue**: Syötteiden (hiiri/touch) koordinaatit on aina muunnettava ruutukoordinaateista canvasin sisäisiksi virtuaalikoordinaateiksi.

---

## 4. Syötteiden hallinta (Input Abstraction)
- Yhtenäistä näppäimistö, hiiri ja mobiilikosketus yhden `Input`-luokan taakse.
- **Mobiili/Touch**: Jokaisessa pelissä on huomioitava pelattavuus kosketusnäytöllä:
  - Yksinkertaisissa peleissä tap-to-jump tai drag-to-move.
  - Monimutkaisemmissa peleissä virtuaalinen D-pad / joystick ja toimintanapit (on-screen touch controls).
- Estä mobiiliselaimen oletustoiminnot pelialueella:
  - `touch-action: none;`
  - `user-select: none;`
  - Estä context menu (oikea klikkaus) canvasissa.

---

## 5. Äänet (Web Audio API)
- Älä vaadi ulkoisia äänitiedostoja (mp3/wav) perustoimintoihin.
- Käytä koodipohjaista proseduraalista äänisynteesiä (`AudioContext`, `OscillatorNode`, `GainNode`).
- **Autoplay-politiikka**: `AudioContext` tulee alustaa tai avata (`audioCtx.resume()`) vasta ensimmäisen käyttäjäinteraktion (klikkaus/näppäin) yhteydessä.

---

## 6. Suorituskyky & Muistinhallinta
- **Objektipoolit (Object Pooling)**: Käytä uudelleenkäytettäviä pooleja usein syntyville ja kuoleville objekteille (partikkelit, ammukset, räjähdyskipinät), jotta selaimen roskienkeruu (Garbage Collection) ei aiheuta nykimistä.
- **Vältä allokointeja silmukassa**: Älä luo uusia objekteja tai taulukoita (`new Vector()`, `{}`) jokaisessa `update()`- tai `render()`-kutsussa.

---

## 7. Visuaalinen laatu ja "Juice"
- Pelin on tunnuttava elävältä ja responsiiviselta:
  - Visuaalinen palaute osumista (screen shake, flash effect, partikkelit).
  - Sulavat animaatiot ja easing-funktiot.
  - Selkeä HUD ja UI (pisteet, terveys, tila).

---

## 8. UI, Painikkeet & Tyylinmukaisuus (Design System)
- Kaikkien UI-elementtien, painikkeiden, modaalien ja tekstien **tulee noudattaa `.agents/blueprint/STYLE_GUIDE.md`:n määrityksiä**.
- **Ei ad-hoc -tyylejä**: Älä koskaan luo satunnaisia `<button>`-elementtejä ilman `.btn-*` tai `.touch-btn` -luokkia.
- **Ei kovakoodattuja värejä**: Kaikkien värien on viitattava `:root`-muuttujiin (`var(--primary)`, `var(--bg-color)`).
- **Ei suoria inline-tyylejä**: Vältä `style="..."` tai `elem.style.color = "..."` -määrityksiä. Käytä luokkia ja CSS-muuttujia.
- **Canvas-värien synkronointi**: Canvas-piirroissa käytettävien heksakoodien on vastattava `STYLE_GUIDE.md`:n palettia.
