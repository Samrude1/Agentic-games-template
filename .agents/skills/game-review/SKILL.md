---
name: game-review
description: >-
  Auditoi ja optimoi HTML/CSS/JS -peliprojektin koodin laadun. Käytä tätä taitoa aina,
  kun käyttäjä pyytää katselmoimaan koodin, tarkistamaan laadun, optimoimaan pelin,
  etsimään spagettikoodia tai suorituskykyongelmia tai ajaa /review tai /optimize -komennon.
---

# Game Code Review & Optimization Skill

Tämä taito ohjaa agenttia suorittamaan syvällisen laadunvarmistuksen ja suorituskykyoptimoinnin HTML/CSS/JS -peliprojektille. Sitä käytetään pitkien koodaussessioiden jälkeen, monen kehittäjän projekteissa tai aina kun halutaan varmistaa, että koodi täyttää ammattimaiset standardit.

---

## Työnkulun vaiheet

### Vaihe 1: Koodin analyysi (Audit Checklist)

Käy läpi kaikki `src/`- ja `index.html` -tiedostot seuraavan tarkistuslistan avulla:

#### 1. Suorituskyky & Pelisilmukan tehokkuus (Performance & 60 FPS)
- **Garbage Collection (GC) -kuorma**:
  - Etsi `update()`- ja `render()`-metodien sisältä `new`-kutsuja (esim. `new Vector()`, `new Particle()`) tai olio-/taulukkoliteraaleja (`{}`, `[]`).
  - *Sääntö*: Silmukassa syntyvät ja kuolevat objektit (ammukset, partikkelit, tehosteet) on hallittava **objektipooleilla (Object Pool)**.
- **Törmäystarkistukset**:
  - Onko vihollisten ja ammusten törmäystarkistus $O(n^2)$? Jos objekteja on paljon, karsitaanko laskentaa (spatial grid, bounding radius, etäisyysvertailu ilman `Math.sqrt`)?
- **Canvas-renderöinti**:
  - Vältetäänkö tarpeettomia `ctx.save()` / `ctx.restore()` -kutsuja?
  - Piirretäänkö vain ruudulla näkyvät asiat (Frustum culling)?
- **DOM & Layout Thrashing**:
  - Luetaanko DOM-ominaisuuksia (`offsetWidth`, `getBoundingClientRect`) pelisilmukan sisällä? (Nämä tulisi lukea vain ikkunan koon muuttuessa `resize`-kuuntelijassa).

#### 2. Arkkitehtuuri & "Spagetti"-koodi
- **Yhden vastuun periaate (Single Responsibility)**:
  - Onko `GameScene` tai muu tiedosto paisunut liian suureksi (esim. yli 300–400 riviä), jossa sekoittuu piirto, fysiikka, äänet ja pelisäännöt?
  - Eriytyvätkö pelaaja, viholliset ja ammukset omiin entiteettiluokkiinsa (`src/entities/`)?
- **Kytkentä (Coupling)**:
  - Pääsevätkö entiteetit käsiksi suoraan toistensa yksityisiin muuttujiin?
- **Globaalit muuttujat**:
  - Varmista, ettei koodissa käytetä `window.myVar` tai `var`-muuttujia.

#### 3. Kommentointi & Koodin luettavuus
- **JSDoc-dokumentaatio**:
  - Onko tärkeimmät luokat, metodit ja parametrit dokumentoitu (`/** ... */`)?
- **Pelimatematiikan ja fysiikan selitykset**:
  - Onko monimutkaiset kulmalaskennat, kiihtyvyysvektorit ja fysiikkakaavat selitetty kommenteissa niin, että muu tiimi ymmärtää ne vaivattomasti?
- **Taikaluvut (Magic Numbers)**:
  - Onko koodissa suoria numeroarvoja ilman selittävää vakiota (esim. `x += 5.2` -> `x += ENEMY_PATROL_SPEED * dt`)?

#### 4. Luotettavuus & Poikkeustilanteet
- Onko `dt` rajoitettu (`Math.min(dt, 0.1)`), jotta välilehden taustalle jättäminen ei riko peliä?
- Palautuuko peli nätisti, kun ikkuna menettää fokuksen (`blur`-tapahtuma)?
- Toimivatko äänet selaimen autoplay-rajoituksista huolimatta?

#### 5. UI, Tyylinmukaisuus & Tyyliliukuma (Style Drift Audit)
- Vertaa käyttöliittymää tiedostoon `.agents/blueprint/STYLE_GUIDE.md`:
  - **Epäviralliset painikkeet**: Löytyykö `<button>`-elementtejä, joilta puuttuu standardiluokka (`.btn-primary`, `.btn-secondary`, `.touch-btn`)?
  - **Kovakoodatut värit**: Etsi heksakoodeja (`#fff`, `#38bdf8`) tai `rgb()`-arvoja CSS:stä tai JS:stä, joita ei ole sidottu `:root`-muuttujiin (`var(--...)`).
  - **Suorat inline-tyylit**: Etsi `style="..."` -attribuutteja tai JS `elem.style.color` -sijoituksia.
  - **Reunapyöristykset ja fontit**: Noudattavatko kaikki komponentit `--radius-*` -muuttujia ja sovittua fonttiperhettä?
  - **Canvas-väripaletti**: Ovatko canvas-piirron värit linjassa `STYLE_GUIDE.md`:n paletin kanssa?

---

### Vaihe 2: Raportin luominen (.agents/blueprint/CODE_REVIEW.md)

Kirjaa havainnot dokumenttiin `.agents/blueprint/CODE_REVIEW.md`:
1. Määritä arvosanat (A–F) jokaiselle osa-alueelle.
2. Listaa kriittiset havainnot.
3. Anna selkeät koodiesimerkit: **Nykyinen toteutus vs. Optimoitu toteutus**.
4. Päivitä samalla `.agents/blueprint/PROJECT_STATUS.md` -tiedoston teknisen velan lista löydöksillä.

---

### Vaihe 3: Katselmusraportti kehittäjälle (Executive Summary)

Esitä käyttäjälle selkeä tiivistelmä:

```markdown
## 🔍 Koodin Laatu- ja Optimointiraportti (Health Review)

### Yhteenveto & Terveyspisteet:
- **Suorituskyky**: [Arvosana A–F] - [Lyhyt huomio]
- **Arkkitehtuuri**: [Arvosana A–F] - [Lyhyt huomio]
- **Kommentointi & Luettavuus**: [Arvosana A–F] - [Lyhyt huomio]
- **Kokonaisarvosana**: [Arvosana A–F]

### 🚨 Kriittisimmät havainnot:
1. [Havainto 1: esim. GC-nykiminen partikkeleista]
2. [Havainto 2: esim. Jättiluokka GameScene kaipaa pilkkomista]

### 💡 Ehdotetut toimenpiteet (Action Plan):
1. [Toimenpide 1 - Pikaoptimointi]
2. [Toimenpide 2 - Refaktorointi]

Täysi raportti tallennettu: `.agents/blueprint/CODE_REVIEW.md`.
```

Kysy käyttäjältä: *"Haluatko, että toteutan suoraan toimenpiteen 1 (esim. objektipoolin luonti / koodin refaktorointi)?"*
