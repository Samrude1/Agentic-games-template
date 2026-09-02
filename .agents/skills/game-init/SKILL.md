---
name: game-init
description: >-
  Alustaa uuden HTML5/Canvas/JS -peliprojektin. Käytä tätä taitoa aina, kun käyttäjä
  pyytää aloittamaan uuden pelin, ajaa /init -komennon tai pyytää projektin alustusta.
  Sisältää automaattisen haastattelutilan (Grill-Me) ja täyden pelirungon pystytyksen.
---

# Game Init Skill

Tämä taito ohjaa uuden HTML/CSS/JS -pelin alustusta ja käynnistystä. Se varmistaa, että pelille luodaan selkeä pelisuunnitelma (GDD) ennen koodausta ja että koodirunko noudattaa parhaita suorituskykystandardeja.

---

## Työnkulun vaiheet

### Vaihe 1: Alkumateriaalin kartoitus
Tarkista, onko projektissa tai käyttäjän viestissä jo olemassa pelin kuvaus:
1. Etsi tiedostoja: `docs/GDD.md`, `game_design.md`, `README.md` tai `pitch.md`.
2. Jos käyttäjä antoi tarkan konseptin pyynnössään, siirry suoraan **Vaiheeseen 3**.
3. Jos idea on puutteellinen tai sitä ei ole annettu lainkaan, siirry **Vaiheeseen 2 (Grill-Me)**.

---

### Vaihe 2: Grill-Me -haastattelu (tarvittaessa)
Jos valmista dokumentaatiota ei ole, älä arvaile liikaa. Siirry vuorovaikutteiseen haastattelutilaan ja esitä käyttäjälle seuraavat 4 ytimekästä kysymystä:

1. **Genre & Päämekaniikka (Core Loop)**:
   - *Minkälainen peli on kyseessä? (esim. Flappy Bird -klooni, Asteroids-avaruusräiskintä, ylhäältä kuvattu roguelike-areena, fysiikkapulmapeli?)*
2. **Ohjaustapa & Laitteet**:
   - *Pelataanko peliä ensisijaisesti näppäimistöllä, hiirellä vai kosketusnäytöllä/mobiililla?*
3. **Visuaalinen tyyli & Teema**:
   - *Mikä on visuaalinen ilme? (esim. Neon Glow / Cyberpunk, Retro 8-bit Pixel Art, Minimal Vector, Puhdas sci-fi?)*
4. **Pelin tavoite & Voitto/Häviö**:
   - *Miten pisteitä kerätään ja milloin peli päättyy? (esim. 3 elämää, aikaraja, aaltopohjainen selviytyminen?)*

*Odota käyttäjän vastausta ennen koodin generointia.*

---

### Vaihe 3: Blueprint-arkkitehtuurin ja GDD:n luominen (.agents/blueprint/)
Kun konsepti on selvillä:
1. Luo tai päivitä `.agents/blueprint/GDD.md` (pelisuunnitelma, säännöt, mekaniikat).
2. Luo tai päivitä `.agents/blueprint/ARCHITECTURE.md` (tekninen arkkitehtuuri, tiedostorakenne, järjestelmäkaavio).
3. Luo tai päivitä `.agents/blueprint/PROJECT_STATUS.md` (nykytila, ominaisuusmatriisi ja roadmap).

---

### Vaihe 4: Pelirungon pystytys (Scaffolding)
Kopioi ja sovella valmiit pohjakomponentit projektin juureen:
1. `index.html` <- [resources/index.html](./resources/index.html)
   - Päivitä pelin otsikko ja tarvittavat UI-tekstit.
2. `style.css` <- [resources/style.css](./resources/style.css)
   - Säädä väripaletti vastaamaan pelin teemaa.
3. `src/core/Engine.js` <- [resources/src/core/Engine.js](./resources/src/core/Engine.js)
4. `src/core/Input.js` <- [resources/src/core/Input.js](./resources/src/core/Input.js)
5. `src/core/Audio.js` <- [resources/src/core/Audio.js](./resources/src/core/Audio.js)
6. `src/core/State.js` <- [resources/src/core/State.js](./resources/src/core/State.js)
7. `src/utils/ObjectPool.js` <- [resources/src/utils/ObjectPool.js](./resources/src/utils/ObjectPool.js)
8. `src/utils/math.js` <- [resources/src/utils/math.js](./resources/src/utils/math.js)
9. `src/utils/Collision.js` <- [resources/src/utils/Collision.js](./resources/src/utils/Collision.js)
10. `src/scenes/GameScene.js` <- [resources/src/scenes/GameScene.js](./resources/src/scenes/GameScene.js)
   - Muokkaa skene vastaamaan `.agents/blueprint/GDD.md`:ssä määriteltyjä hahmoja, objekteja ja sääntöjä.
11. `src/main.js` <- [resources/src/main.js](./resources/src/main.js)

---

### Vaihe 5: Varmennus ja testaus
1. Varmista, että peli käynnistyy ilman konsolivirheitä.
2. Testaa perusohjaus (liike, äänet, kosketusnapit).
3. Anna käyttäjälle yhteenveto luodusta pelistä ja ehdota seuraavaa kehitysaskelta (esim. lisäviholliset, partikkelit tai tasonvaihto).
