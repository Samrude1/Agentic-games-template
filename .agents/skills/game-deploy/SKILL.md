---
name: game-deploy
description: >-
  Paketoi ja valmistelee pelin jakelua varten (PWA, itch.io, GitHub Pages).
  Käytä tätä taitoa aina, kun käyttäjä haluaa julkaista pelin, paketoida sen jakeluun,
  tehdä siitä offline-pelattavan PWA:n tai ajaa komennon /build, /deploy tai /export.
---

# Game Deploy & Packaging Skill

Tämä taito ohjaa agenttia valmistelemaan HTML5 Canvas -pelin jakelua ja julkaisua varten. Se varmistaa, että peli toimii itsenäisesti ilman ulkoisia palvelinriippuvuuksia, on asennettavissa mobiililaitteille (PWA) ja on valmis ladattavaksi esimerkiksi **itch.io**- tai **GitHub Pages** -alustoille.

---

## Julkaisuvalmistelun Työnkulku

### Vaihe 1: Tuotantovalmiuden tarkistuslista (Production Audit)
1. **Suhteelliset polut (Relative Paths)**:
   - Varmista, että kaikki importit ja resurssiviittaukset (`src/main.js`, `style.css`, äänitiedostot, kuvat) käyttävät suhteellisia polkuja (`./style.css`), jotta peli toimii missä tahansa alihakemistossa (kuten `github.io/pelinnimi/`).
2. **Koodin siisteys**:
   - Poista tai karsi ylimääräiset testauslokit (`console.log`).
   - Varmista, että `showFps` on oletuksena pois päältä tuotannossa.
3. **SEO & Metadata**:
   - Varmista `<title>`, `<meta name="description">` ja OpenGraph-jakokortit (`og:title`, `og:image`) tiedostossa `index.html`.

---

### Vaihe 2: PWA-tuki (Progressive Web App / Offline Play)
Jos peliä halutaan pelata mobiilissa kuin natiivisovellusta:
1. **`manifest.json`**:
   - Nimi, lyhytnimi, `start_url: "./index.html"`, `display: "standalone"`, `orientation: "landscape"` (tai portrait), teemavärit.
2. **Service Worker (`sw.js`)**:
   - Kevyt välimuistitallennus (Cache First), joka tallentaa `index.html`, `style.css` ja `src/`-koodit offline-käyttöä varten.
3. **Rekisteröinti**:
   - Varmista rekisteröintilogiikka `src/main.js`:n alussa.

---

### Vaihe 3: Alustakohtainen paketointi

#### A. itch.io ZIP -jakelu:
- Kaikki tiedostot pakataan ZIP-arkiston juureen (`index.html` suoraan juuritasolla, ei ylimääräisiä kansiokerroksia).
- Suositellut asetukset itch.io-sivulle:
  - *Kind of project*: HTML
  - *Viewport dimensions*: Sama kuin `virtualWidth` x `virtualHeight` (esim. 960 x 540).
  - *Mobile friendly*: Kyllä.

#### B. GitHub Pages -julkaisu:
- Valmistele tiedostot `main`- tai `gh-pages` -haaraan.
- Anna käyttäjälle suorat 2-vaiheiset aktivointiohjeet GitHubin asetuksista (*Settings -> Pages*).

---

### Vaihe 4: Julkaisuraportti kehittäjälle
Anna kehittäjälle valmis kuvaus tuotantopaketista, luoduista tiedostoista ja suorista lataus-/käyttöohjeista.
