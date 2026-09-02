---
name: game-memory
description: >-
  Hallitsee pitkäkestoista projektimuistia ja sessiovaihtoja. Käytä tätä taitoa,
  kun käyttäjä pyytää tallentamaan tilan ennen keskustelun lopettamista (/save, /checkpoint),
  tai kun aloitetaan uusi keskustelu ja pyydetään palauttamaan tilannekuva (/resume, /start-session).
---

# Game Long-Term Memory & Session Handoff Skill

Tämä taito ratkaisee LLM-agenttien konteksti-ikkunan täyttymisen ja token-kulutuksen. Se mahdollistaa keskustelun nollaamisen ilman, että konteksti tai projektin nykytila katoaa.

---

## 1. TALLENNUS-operaatio (`/save` tai `/checkpoint`)

Suorita nämä askeleet, kun käyttäjä haluaa tallentaa istunnon tilan:

### Askel 1: Session analyysi
Käy läpi nykyisen keskustelun tapahtumat ja tehdyt tiedostomuutokset:
- Mitä ominaisuuksia luotiin tai korjattiin?
- Mitä tiedostoja muokattiin?
- Onko koodi toimivassa tilassa vai jäikö jokin kesken?

### Askel 2: Päivitä `.agents/blueprint/SESSION_STATE.md`
Kirjoita tiedostoon tiivis ja jäsennelty tilanne:
1. Päivämäärä ja kellonaika.
2. Saavutukset tässä istunnossa.
3. Koodin vakaus (toimiiko peli, mitä testattiin).
4. **Seuraava välitön tehtävä** uudelle sessiolle ja tiedostot, joita tullaan muokkaamaan.
5. **Avaintiedostot (2–4 kpl)**, jotka uuden agentin pitää lukea heti alussa.

### Askel 3: Lisää merkintä lokiin `.agents/blueprint/DEV_LOG.md`
Lisää uusi aikaleimattu merkintä kehityspäiväkirjaan, jossa tiivistetään tehdyt päätökset ja edistysaskeleet.

### Askel 4: Päivitä `.agents/blueprint/PROJECT_STATUS.md`
Päivitä ominaisuusmatriisin tilat (valmiit / kesken) ja arvioitu valmiusprosentti.

### Askel 5: Lähtökuittaus käyttäjälle
Vastaa käyttäjälle selkeästi:
> ✅ **Sessio tallennettu turvallisesti!**
> - **Seuraavaksi työlistalla**: [Lyhyt kuvaus seuraavasta tehtävästä]
> - Voit nyt sulkea tämän keskustelun tokenien säästämiseksi. Kun aloitat uuden chatin, kirjoita vain `/resume`, niin jatkan suoraan tästä!

---

## 2. PALAUTUS-operaatio (`/resume` tai `/start-session`)

Suorita nämä askeleet heti, kun käyttäjä aloittaa uuden keskustelun ja ajaa `/resume`:

### Askel 1: Muistin lukeminen
1. Lue välittömästi:
   - `.agents/blueprint/SESSION_STATE.md`
   - `.agents/blueprint/PROJECT_STATUS.md`
2. Lue vain ne **2–4 avaintiedostoa**, jotka on listattu `SESSION_STATE.md`:n kohdassa *Luettavat Avaintiedostot* (esim. `src/main.js` ja aktiivinen skene).
   *(Älä lue koko koodikantaa kerralla, jotta uusi konteksti pysyy puhtaana ja nopeana!)*

### Askel 2: Valmiusraportti käyttäjälle (Kick-off)
Esitä käyttäjälle napakka 3–4 lauseen tilannekuva:

```markdown
👋 **Tervetuloa takaisin! Olen lukenut projektin muistin ja koodin nykytilan.**

- **Viime istunnon saavutukset**: [Mitä tehtiin edellisellä kerralla]
- **Projektin tila**: [Toimiiko peli, mitä on valmiina]
- **Tämän päivän suositeltu aloitus**: 👉 [Tarkka tehtävä, esim. Vihollisten spawnaus GameScene.js:ssä]

Aloitetaanko suoraan tästä vai haluatko tehdä tänään jotain muuta?
```
