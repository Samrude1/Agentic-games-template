---
name: game-debug
description: >-
  Etsii, diagnosoi ja korjaa pelin bugit ja tekniset viat. Käytä tätä taitoa aina,
  kun käyttäjä raportoi bugin, peli ei toimi, näyttö on musta, fysiikka käyttäytyy oudosti,
  tai kun ajetaan komento /debug tai /fix.
---

# Game Debug & Diagnostics Skill

Tämä taito ohjaa agenttia suorittamaan systemaattisen ja tehokkaan vianetsinnän HTML5 Canvas / JavaScript -peleissä. Sen tavoitteena on löytää perussyy nopeasti, korjata koodi ja estää saman virheen toistuminen.

---

## Vianetsinnän Työnkulku

### Vaihe 1: Oireiden kartoitus
Kysy tarvittaessa tai analysoi käyttäjän raportti:
1. **Mitä tapahtuu?** (Musta ruutu, ohjain ei vastaa, peli kaatuu tietyssä tilanteessa, fysiikka sekoaa, äänet eivät kuulu?)
2. **Milloin vika ilmenee?** (Heti käynnistyksessä, tietyn painikkeen jälkeen, viholliseen törmätessä?)

---

### Vaihe 2: Diagnostinen tarkistuslista (Root Cause Checklist)

Käy läpi tyypillisimmät Canvas-pelien vikakohteet:

#### 1. "Musta ruutu" tai piirron puuttuminen
- Tarkista Canvas-koko: onko `virtualWidth` / `virtualHeight` nolla?
- Tarkista `ctx.clearRect()`: pyyhkiikö silmukka ruudun, mutta `render()`-metodi ei piirrä mitään?
- Tarkista z-indexit: peittääkö `#ui-overlay` pelialueen ja estääkö se klikkaukset (`pointer-events: none`)?
- Tarkista kuvien tai fonttien lataus: odottaako renderöinti assettia, joka ei koskaan latautunut?

#### 2. Koordinaatisto- ja fysiikkasekoamiset
- Etsi `NaN`- tai `undefined`-arvoja koordinaateissa (`x`, `y`, `vx`, `vy`).
  *(Tyypillinen syy: jako nollalla normalisoinnissa tai puuttuva alustusarvo).*
- Tarkista delta-time: pääsikö `dt` hyppäämään liian suureksi välilehteä vaihdettaessa?
- Tarkista ruutukoordinaattien skaalaus: käyttääkö syötekäsittelijä `engine.screenToVirtual()` -muunnosta?

#### 3. Tilakone & Silmukan jäätyminen
- Onko `engine.switchScene()` kutsuttu olemattomalle skenelle?
- Jäikö `isRunning` arvoon `false`?
- Heittääkö jokin luokka poikkeuksen `update()`-kutsussa, mikä katkaisee `requestAnimationFrame`-ketjun?

#### 4. Ääniongelmat
- Onko `audio.init()` kutsuttu osana aitoa käyttäjän klikkaus-/kosketustapahtumaa?
- Onko `AudioContext.state` jäänyt tilaan `'suspended'`?
- Onko `isMuted` vahingossa päällä tai äänenvoimakkuus nollassa?

---

### Vaihe 3: Korjauksen toteutus & Validointi
1. Paikanna tarkka tiedosto ja rivi.
2. Korjaa koodi säilyttäen olemassa olevat arkkitehtuurimallit (esim. ei globaaleja muuttujia, ei ad-hoc -tyylejä).
3. Varmista, ettei korjaus aiheuta suorituskyvyn heikkenemistä (esim. uusia allokointeja silmukkaan).

---

### Vaihe 4: Bugilokin päivitys (.agents/blueprint/KNOWN_BUGS.md)
Kirjaa korjattu vika tai vielä avoimet tiedossa olevat ongelmat tiedostoon `.agents/blueprint/KNOWN_BUGS.md`:
- Pvm & Vikakuvaus
- Perussyy (Root Cause)
- Ratkaisu & Korjattu tiedosto
