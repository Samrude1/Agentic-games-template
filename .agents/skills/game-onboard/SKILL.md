---
name: game-onboard
description: >-
  Kartoittaa ja auditoi olemassa olevan tai keskeneräisen HTML/CSS/JS -peliprojektin.
  Käytä tätä taitoa aina, kun käyttäjä pyytää hyppäämään mukaan kesken olevaan projektiin,
  auditoimaan koodin, ottamaan projektin haltuun tai ajaa /onboard tai /audit -komennon.
  Luo koko projektin tilannekuvan ja blueprint-dokumentaation (.agents/blueprint/).
---

# Game Onboarding & Audit Skill

Tämä taito ohjaa agenttia hyppäämään mukaan olemassa olevaan, keskeneräiseen tai refaktoroitavaan peliprojektiin ammattimaisella otteella. Sen tavoitteena on selvittää projektin nykytila, luoda kattava dokumentaatio (.agents/blueprint/) ja laatia selkeä toimintasuunnitelma ennen koodimuutoksia.

---

## Työnkulun vaiheet

### Vaihe 1: Koodikannan syväkartoitus (Deep Codebase Audit)

Käy läpi projektin nykyiset tiedostot työkalujen (`list_dir`, `view_file`, `grep_search`) avulla:

1. **HTML & Rakenne**:
   - Tarkista `index.html`: Miten Canvas on alustettu? Onko viewport-meta mobiilioptimoitu? Onko DOM-pohjaisia overlay-valikoita tai HUDia?
2. **Pelisilmukka & Ajoitus**:
   - Etsi pääsilmukka (`requestAnimationFrame`, `setInterval` tai `setTimeout`).
   - Tarkista, käyttääkö peli **delta-timea (`dt`)** vai onko liikenopeus sidottu suoraan näyttölaitteen virkistystaajuuteen (Hz)?
   - Onko delta-time suojattu lagipiikeiltä (`Math.min(dt, maxDt)`)?
3. **Koodirakenne & Modulaarisuus**:
   - Onko koodi yhdessä jättitiedostossa vai jaettu loogisiin moduuleihin (ES Modules)?
   - Onko koodissa vaarallisia globaaleja muuttujia (`window.x`, `var`)?
   - Miten pelitiloja (Menu, Game, GameOver) hallitaan? Onko käytössä tilakone?
4. **Responsiivisuus & Skaalaus**:
   - Onko Canvas kiinteän kokoinen (esim. 800x600) vai skaalautuuko se eri ruuduille säilyttäen kuvasuhteen?
   - Miten hiiri- ja kosketuskoordinaatit skaalataan Canvasin sisäiseen koordinaatistoon?
5. **Syötteet (Inputs)**:
   - Mitä ohjaustapoja tuetaan (näppäimistö, hiiri, kosketusnäyttö)?
   - Onko mobiilipelaajille virtuaalisia kontrolleja?
6. **Äänet & Tehosteet**:
   - Onko ääniä toteutettu? Käytetäänkö Web Audio APIa vai HTML5 `<audio>` -elementtejä?
   - Ovatko osumat ja tapahtumat "mehukkaita" (screen shake, partikkelit, välähdykset)?

---

### Vaihe 2: Blueprint-dokumentaation generointi (.agents/blueprint/)

Kun koodi on analysoitu, luo tai päivitä projektin pysyvä dokumentaatio kansioon `.agents/blueprint/`:

1. **`.agents/blueprint/GDD.md`**:
   - Dokumentoi koodista havaitut mekaniikat, pelaajahahmo, viholliset, säännöt, ohjaukset ja tavoite.
2. **`.agents/blueprint/ARCHITECTURE.md`**:
   - Piirrä nykyisen koodin arkkitehtuurikaavio (Mermaid).
   - Listaa tiedostojen nykyiset vastuut ja mahdolliset refaktorointitarpeet.
3. **`.agents/blueprint/PROJECT_STATUS.md`**:
   - Arvioi projektin valmiusaste (0–100%).
   - Täytä **Ominaisuusmatriisi (Feature Matrix)** (mikä on valmista, mikä kesken, mikä puuttuu).
   - Listaa **Tekninen velka ja havaitut riskit** (esim. puuttuva delta-time, muistivuodot, kosketusohjauksen puute).
   - Laadi **Priorisoitu toimintasuunnitelma (Action Plan)** seuraaville sprinteille.

---

### Vaihe 3: Johdon yhteenveto kehittäjälle ("Lentotarkastus")

Esitä käyttäjälle tiivis ja selkeä raportti auditoinnin tuloksista:

```markdown
## 🕹️ Projektin Kartoitusraportti (Onboarding Audit)

### 1. Tilannekuva & Pelikonsepti
- **Peli**: [Pelin tyyppi ja genre]
- **Valmiusaste**: [Arvioitu %]
- **Havainto**: [1-2 lauseen kiteytys projektin nykytilasta]

### 2. Mikä toimii hyvin (The Good)
- [Positiiviset havainnot koodista]

### 3. Havaitut puutteet & Tekninen velka (Areas for Improvement)
- [Kriittiset huomiot, esim. puuttuva delta-time, kova koodattu resoluutio, puuttuvat äänet]

### 4. Ehdotettu toimintasuunnitelma (Next Steps)
1. [Ensimmäinen looginen korjaus / ominaisuus]
2. [Seuraava askel]

Kaikki havainnot on tallennettu projektin blueprint-kansioon: `.agents/blueprint/`.
```

Kysy lopuksi käyttäjän vahvistusta: *"Haluatko aloittaa suoraan vaiheesta 1 (esim. pelisilmukan korjaus / uuden ominaisuuden toteutus)?"*
