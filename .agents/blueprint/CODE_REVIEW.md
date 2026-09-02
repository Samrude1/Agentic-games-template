# Koodin Laatu- ja Optimointiraportti (Code Review & Health Report)

Tämä raportti luodaan ja päivitetään aina, kun suoritetaan komento `/review` tai `/optimize`. Se antaa selkeän kuvan koodikannan laadusta, suorituskyvystä ja refaktorointitarpeista.

---

## 1. Yhteenveto & Terveyspisteet (Code Health Score)

| Osa-alue | Arvosana (A–F) | Tila | Huomiot |
| :--- | :---: | :---: | :--- |
| **Suorituskyky (Performance)** | - | ⬜ | Pelisilmukka, GC-allokaatiot, törmäyslaskenta |
| **Arkkitehtuuri & Modulaarisuus** | - | ⬜ | Komponenttirakenne, spagettikoodi, vastuut |
| **Luettavuus & Kommentointi** | - | ⬜ | JSDoc, taikaluvut, matematiikan dokumentointi |
| **Luotettavuus & Poikkeukset** | - | ⬜ | Ikkunafokus, autoplay, lagipiikkisuojaus |
| **UI & Tyylinmukaisuus (Design System)** | - | ⬜ | STYLE_GUIDE.md noudattaminen, napit, värit, ei ad-hoc tyylejä |

*Kokonaisarvosana*: **-** (Päivitetään auditoinnin yhteydessä)

---

## 2. Kriittiset havainnot & Bugiriskit (Critical Issues)
*Asiat, jotka voivat aiheuttaa pelin kaatumisen, vakavia FPS-droppeja tai pelattavuusongelmia:*

- Esimerkki: `src/scenes/GameScene.js`: Uusien partikkeliobjektien allokointi suoraan `update()`-silmukassa aiheuttaa roskienkeruun nykimistä (GC spikes).

---

## 3. Suorituskykyoptimoinnit (Performance & 60 FPS)

### A. Roskienkeruu & Muistinhallinta (Garbage Collection)
- [ ] Tarkistettu: Luodaanko `new`-kutsuja tai literaaleja `{}` / `[]` silmukoissa?
- [ ] Tarkistettu: Käytetäänkö usein syntyville olioille (ammukset, partikkelit) objektipoolia?

### B. Renderöinti & Canvas
- [ ] Tarkistettu: Minimoitu tarpeettomat `ctx.save()` / `ctx.restore()` -kutsut.
- [ ] Tarkistettu: Ei DOM-mittojen lukemista (`getBoundingClientRect`) joka framella.

### C. Törmäystarkistukset
- [ ] Tarkistettu: Algoritminen monimutkaisuus (onko $O(n^2)$ vai jaettu ruudukkoon/etäisyyskarsintaan?).

---

## 4. Koodin Siisteys, Spagetti & Arkkitehtuuri

### A. Vastuut ja "God Objects"
- Onko jokin tiedosto kasvanut liian suureksi (esim. yli 400 riviä), ja voidaanko siitä eriyttää entiteettejä tai apuluokkia?

### B. Globaali tila ja kytkökset
- Ovatko luokat riippuvaisia toistensa sisäisistä muuttujista suoraan?

---

## 5. Kommentointi, JSDoc & Taikaluvut

### A. Pelimatematiikan ja fysiikan selitykset
- Onko kulmalaskennat, kiihtyvyydet ja trigonometria selitetty kommenteissa?

### B. Taikaluvut (Magic Numbers)
- Etsi kovat koodatut numerot (esim. `x += 4.5;`) ja korvaa ne selkeillä vakioilla:
  ```javascript
  // Ennen:
  this.speed = 320;
  this.jumpForce = -450;
  
  // Jälkeen:
  const PLAYER_MAX_SPEED = 320;
  const JUMP_IMPULSE = -450;
  ```

---

## 6. UI & Tyylinmukaisuus (Design System & Style Drift)

### A. Painikkeiden standardit (.btn-*)
- [ ] Tarkistettu: Kaikki `<button>`-elementit käyttävät luokkia `.btn-primary`, `.btn-secondary` tai `.touch-btn`.
- [ ] Tarkistettu: Ei yhtään ad-hoc -nappia ilman standardiluokkia.

### B. Värimuuttujat ja Kovakoodatut Arvot
- [ ] Tarkistettu: Kaikki CSS-värit viittaavat `:root`-muuttujiin (`var(--primary)`, `var(--panel-bg)` jne.).
- [ ] Tarkistettu: Ei kovakoodattuja heksakoodeja tai rgb-arvoja CSS-säännöissä.
- [ ] Tarkistettu: Ei `style="..."` -inline-tyylejä HTML- tai JS-koodissa.

### C. Canvas-piirron väriyhtenäisyys
- [ ] Tarkistettu: Pelaajan, vihollisten ja partikkeleiden canvas-värit täsmäävät `STYLE_GUIDE.md`:n palettiin.

---

## 7. Priorisoitu Korjaussuunnitelma (Refactoring Action Plan)
1. **Pikaoptimoinnit & Tyylikorjaukset**: Nappien luokitus, kovakoodattujen värien siirto muuttujiksi.
2. **Arkkitehtuurikorjaukset**: Luokkien pilkkominen ja spagetin purkaminen.
3. **Kommentointi & Dokumentointi**: Tärkeimpien funktioiden JSDoc-dokumentointi.
