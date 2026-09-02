---
name: game-test
description: >-
  Suorittaa pelin automatisoidun testauksen ja laadunvarmistuksen selaimessa.
  Käytä tätä taitoa aina, kun käyttäjä pyytää testaamaan pelin toimivuuden,
  ajaa /test tai /playtest -komennon tai tehtyjen muutosten jälkeen halutaan varmistaa ettei mikään hajonnut.
---

# Game Test & Automated Playtesting Skill

Tämä taito ohjaa agenttia suorittamaan pelin kattavan automatisoidun testauksen selaimessa. Yksin kehittäessä tämä on kehittäjän "toinen silmäpari", joka estää koodin rikkoutumisen huomaamatta.

---

## Testauksen Työnkulku

### Vaihe 1: Peliympäristön käynnistys
1. Tarkista, onko projektissa dev-serveriä tai käynnistä tarvittaessa kevyt paikallinen palvelin (esim. `npx serve .` tai vastaava), tai avaa suoraan `index.html`.
2. Käynnistä `browser_subagent` suorittamaan varsinainen pelisession testaus.

---

### Vaihe 2: Selaimen tarkistuslista (Browser Subagent Checklist)

Pyydä subagenttia suorittamaan seuraavat vaiheet ja raportoimaan tulokset:

1. **Konsolivirheet (Console Errors)**:
   - Onko JavaScript-syntaksivirheitä, puuttuvia moduuli-importteja tai käsittelemättömiä poikkeuksia (`Uncaught TypeError`, `404 Not Found`)?
2. **Käynnistys ja Canvas-renderöinti**:
   - Latautuuko peli ilman mustaa ruutua?
   - Onko aloitusnäyttö (Start Screen overlay) näkyvissä?
   - Onko Canvas-elementin leveys ja korkeus alustettu oikein?
3. **Interaktio ja Aloitus**:
   - Klikkaa aloituspainiketta (`#btn-start`) tai simuloi välilyönnin painallusta.
   - Varmistu, että overlay piiloutuu ja peli siirtyy aktiiviseen pelitilaan (`GameScene`).
4. **Pelisilmukka & Suorituskyky**:
   - Tarkkaile FPS-lukemaa: pysyykö vakaana (~60 FPS)?
   - Onko havaittavissa lagipiikkejä tai nykimistä?
5. **Äänijärjestelmän tila**:
   - Tarkista selaimen audiokontekstin tila: siirtyikö `AudioContext` käyttäjäklikkauksen jälkeen tilaan `running` (selaimen autoplay-politiikka)?
6. **Kuvakaappauksen taltiointi**:
   - Ota ruutukaappaus aktiivisesta pelistä raporttia varten.

---

### Vaihe 3: Testausraportti kehittäjälle (Playtest Report)

Esitä käyttäjälle selkeä ja tiivis yhteenveto:

```markdown
## 🧪 Pelitestauksen Tulokset (Playtest Report)

### Yleiskatsaus
- **Tila**: ✅ HYVÄKSYTTY / ❌ VIRHEITÄ HAVAITTU
- **FPS**: ~[60] FPS (Vakaa / Heilahteleva)
- **Konsolivirheet**: [0 kpl / Virheiden määrä ja seloste]
- **Äänijärjestelmä**: [Toimii / Autoplay estetty]

### Havainnot
- [Havainto 1: Aloitusnäyttö ja skenen vaihto toimii virheettömästi]
- [Havainto 2: Pelaaja reagoi syötteisiin ja partikkelit piirtyvät]

### Visuaalinen tila
[Liitä kuvakaappaus pelitilanteesta]
```

Jos testissä havaittiin virheitä, ehdota suoraan korjaustoimenpidettä tai komentoa `/debug`.
