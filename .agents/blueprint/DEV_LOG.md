# Kehitysloki ja Päiväkirja (Development Log)

Tähän dokumenttiin kertyy pysyvä kehityshistoria ja tärkeimmät arkkitehtuuripäätökset aikajärjestyksessä. `/save` -komento lisää tähän uuden merkinnän jokaisen istunnon päätteeksi.

---

## [Pvm] - Istunto: Projektin Alustus & Työkalupakki
- **Kehittäjä & Agentti**: Uuden kehitystemplaten ja työnkulkujen rakentaminen.
- **Tärkeimmät saavutukset**:
  - Luotu 60 FPS deterministinen pelimoottoripohja (`Engine.js`, `Input.js`, `Audio.js`, `State.js`).
  - Luotu työkalut: `/init`, `/onboard`, `/review`, `/save` ja `/resume`.
  - Pystytetty `.agents/blueprint/` projektin totuuden lähteeksi.
- **Arkkitehtuuripäätökset**:
  - Käytetään puhdasta HTML5 Canvasia ilman ulkoisia kirjastoja maksimaalisen suorituskyvyn takaamiseksi.
  - Kaikki äänet syntetisoidaan Web Audio APIlla, jotta vältytään ulkoisilta äänitiedostoilta.
