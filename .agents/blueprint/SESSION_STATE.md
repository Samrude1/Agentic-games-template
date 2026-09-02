# Aktiivinen Sessiomuisti (Active Session State)

Tämä tiedosto toimii agenttien välisenä "viestikapulana" ja muistipuskurina. Se päivitetään aina istunnon päättyessä komennolla `/save` ja luetaan uuden istunnon alkaessa komennolla `/resume`.

---

## 1. Viimeisin Istunto (Last Session Info)
- **Päivämäärä & Aika**: [Pvm ja klo]
- **Session fokus**: [Mitä tässä istunnossa kehitettiin tai tavoiteltiin]
- **Kokonaisvalmiusaste**: [esim. 25%]

---

## 2. Mitä Tehtiin Tässä Istunnossa (Accomplishments)
- [x] [Muutos 1: esim. Lisätty pelaajan hyppymekaniikka ja ääni]
- [x] [Muutos 2: esim. Refaktoroitu Input.js tukemaan virtuaalisia mobiilinappeja]
- [x] [Muutos 3: esim. Korjattu törmäyslaskennan bugi GameScene.js:ssä]

---

## 3. Nykyinen Tekninen Tila (Current State & Stability)
- **Toimiiko peli tällä hetkellä?**: Kyllä / Ei (konsolissa ei virheitä / peli käynnistyy)
- **Testatut ominaisuudet**: Pelaajan liike, kosketusnapit mobiilikoossa, äänisynteesi.
- **Kesken jääneet asiat / Estävät tekijät (Blockers)**:
  - [Esim. Vihollisten spawnauslogiikka on aloitettu, mutta aaltomekaniikka puuttuu]

---

## 4. Seuraava Tehtävä Uudelle Sessiolle (Next Immediate Task)
👉 **Aloita tästä**: [Tarkka kuvaus ensimmäisestä tehtävästä uudessa sessiossa]
- **Tiedostot, joita muokataan seuraavaksi**:
  - `src/scenes/GameScene.js`
  - `src/entities/Enemy.js`

---

## 5. Uudelle Agentille: Luettavat Avaintiedostot (Key Files to Read)
*Lue nämä 2–4 tiedostoa päästäksesi välittömästi kärryille koodin nykytilasta ilman koko projektin uudelleenlukua:*
1. `src/main.js` (Pelin alustus ja skenekytkennät)
2. `src/scenes/GameScene.js` (Aktiivinen pelilogiikka)
3. `.agents/blueprint/PROJECT_STATUS.md` (Tiekartta ja ominaisuusmatriisi)
