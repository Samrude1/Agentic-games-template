# Tekoälyavusteisen Pelinkehityksen Käyttöopas (Comprehensive User Guide)

Tämä on kattava ammattilaisen käyttöopas (Engineering Manual) Agentic Game Dev -templatelle. Tämän oppaan tarkoitus on avata `.agents`-hakemiston todellinen voima, purkaa sen osat ja antaa selkeät, toistettavat toimintaohjeet peliprojektin jokaisessa elinkaaren vaiheessa. Tällä mallilla estetään tekoälyn hallusinointi ja varmistetaan, että pelin koodipohja pysyy skaalautuvana, performanttina ja kurinalaisena.

---

## 1. Järjestelmän Ydin: `.agents` -hakemiston Anatomia

Kaikki äly ja säännöstö asuu projektin juuren `.agents/` -kansiossa. Tämä on "tekoälyn aivot". Se pakottaa tekoälyn toimimaan kokeneen seniori-pelikehittäjän tavoin. Hakemisto on jaettu neljään kriittiseen osaan:

1. **`context/` (Totuuden Lähde)**: Sisältää dokumentit, jotka määrittelevät *mitä* peliä ollaan rakentamassa ja *millä säännöillä* (esim. pelilooppi, suorituskyky). Tekoälyn tulee aina konsultoida näitä ennen koodausta.
2. **`workflows/` (Prosessit)**: Sisältää täsmälliset askelmerkit siihen, *missä järjestyksessä* erilaiset tehtävät (esim. uuden vihollisen luonti, kenttäsuunnittelu) suoritetaan.
3. **`skills/` (Kognitiiviset Taidot)**: Sisältää tekoälyn "työkalut" ja kyvyt, joita se voi kutsua koodauksen aikana tai sen jälkeen (esim. suunnittelu, koodin arviointi, tasapainotuksen tallennus).
4. **`feature-specs/` (Historiallinen Arkisto)**: Kun tekoäly laatii suunnitelman ja ihminen sen hyväksyy, se tallennetaan tänne numeroituna dokumenttina (esim. `01-feature.md`). Tämä on projektin muuttumaton spec-driven -audit trail.

---

## 2. Projektin Elinkaari: Aloitus, Tallennus ja Palautus

### Uuden peliprojektin aloitus (Quick-Start)
1. **Pohjatyö**: Kloonaa repo. Kirjoita pelin visio ja tavoitteet tiedostoon `docs/future-project-vision.md`.
2. **Tekoälyn herätys ja alustus**: Avaa tekoäly-IDE:si chat ja anna ensimmäinen komento:
   > *"Moikka! Luodaan uusi peli. Aja `/init`."*
   Tekoäly lukee visiosi ja täyttää automaattisesti `.agents/context/` -kansion tiedostot (arkkitehtuuri, mekaniikat) vastaamaan peliäsi.
3. **Ensimmäisen ominaisuuden rakennus**: Kun konteksti on alustettu, pyydä tekoälyä aloittamaan koodaus:
   > *"Aloitetaan pelin core-loopin rakentaminen. Käytä `.agents/workflows/new-feature-workflow.md` työnkulkua."*
4. **Arkkitehtuurin lukitus**: Tekoäly ajaa automaattisesti `/architect`-taidon. Se tekee Implementation Planin ja päivittää arkkitehtuuridokumentit. **Sinä hyväksyt.**
5. **Koodaus**: Hyväksynnän jälkeen tekoäly aloittaa konkreettisen koodauksen (Canvas, Vanilla JS).

### Session tallentaminen (Työpäivän päätös)
Tekoälyllä ei ole omaa muistia eri sessioiden (chat-ikkunoiden) välillä. Ennen kuin suljet ohjelman, varmista jatkuvuus:
> *"Olen valmis tältä päivältä. Aja `/remember save`."*
Tekoäly kerää yhteenvedon tehdyistä asioista, ratkaisuista ja avoimista ongelmista, ja tallentaa ne `memory.md` -tiedostoon projektin juureen.

### Session palauttaminen (Työpäivän aloitus)
Kun palaat koneelle seuraavana päivänä tai aloitat uuden chatin:
> *"Jatketaan hommia. Aja `/remember restore`."*
Tekoäly lukee `memory.md` -tiedoston ja `.agents/context/` -hakemiston, ja on välittömästi perillä siitä, mitä oltiin tekemässä.

---

## 3. Työnkulut (`.agents/workflows/`)

Workflows-kansio on projektin sydän. Älä koskaan pyydä tekoälyä vain "tekemään jotain". Käske sitä aina noudattamaan tiettyä työnkulkua. Jokainen työnkulku määrittelee vaiheet suunnittelusta (Architect) toteutukseen ja katselmointiin (Review).

Tässä on katsaus kaikkiin saatavilla oleviin työnkulkuihin ja siihen, milloin niitä käytetään:

### `new-feature-workflow.md`
- **Mihin käytetään**: Kun rakennetaan iso pelillinen järjestelmä (esim. inventory-systeemi, uusi pelimuoto tai monimutkainen AI-käyttäytyminen).
- **Mitä se tekee**: Tekoäly pakotetaan luomaan iso laaja Implementation Plan, huomioimaan peliloopin asettamat suorituskykyvaatimukset ja rakentamaan ominaisuus end-to-end.

### `game-entity-workflow.md`
- **Mihin käytetään**: Uusien peliobjektien luomiseen (esim. uusi vihollistyyppi, ammus, kerättävä esine).
- **Mitä se tekee**: Varmistaa, että tekoäly suunnittelee objektin hitboksit, nopeudet ja tilakoneet oikein. Pakottaa `/imprint` -taidon käytön, jotta olennon asetukset tallentuvat yhtenäisyyttä varten.

### `level-design-workflow.md`
- **Mihin käytetään**: Uusien kenttien (level) suunnitteluun, tilemappien lataamiseen ja entiteettien sijoitteluun.
- **Mitä se tekee**: Keskittyy kenttädatan käsittelyyn, parsimiseen ja objektien oikeaoppiseen instansiointiin pelimaailmassa.

### `legacy-project-onboarding.md`
- **Mihin käytetään**: Kun tuot tämän templaatin jo olemassa olevaan koodipohjaan.
- **Mitä se tekee**: Auttaa tekoälyä kartoittamaan nykyisen pelin tilan ja luomaan tarvittavat kontekstitiedostot.

### `code-optimization-workflow.md`
- **Mihin käytetään**: Pelin koodin siistimiseen ja suorituskyvyn parantamiseen (esim. Game Loopin optimointi, Object Pooling).
- **Mitä se tekee**: Tekoäly analysoi koodin, etsii pullonkauloja ja refaktoroi koodin ammattimaiseksi ilman, että pelin toiminnallisuus rikkoutuu.

### `testing-workflow.md`
- **Mihin käytetään**: Pelin ydinmekaniikkojen, matematiikan ja tilakoneiden laadunvarmistukseen automaattisilla testeillä.
- **Mitä se tekee**: Ohjaa tekoälyn suunnittelemaan ja kirjoittamaan yksikkötestejä pelilogiikalle regressioiden estämiseksi.

> **Esimerkki työnkulun pyytämisestä**:
> *"Tee uusi lentävä vihollistyyppi. Käytä `game-entity-workflow.md`."*

---

## 4. Taidot (`.agents/skills/`)

Skills-kansio eroaa Workflows-kansiosta siinä, että taidot ovat spesifejä *työkaluja* tai *kyvykkyyksiä*, joita tekoäly käyttää suorittaakseen workflows-vaiheita. Ne sisältävät `SKILL.md` tiedostoja, jotka opettavat tekoälylle, miten sen kuuluu reagoida eri tilanteisiin.

Voit joko pyytää tekoälyä ajamaan taidon ("Aja `/architect`"), tai tekoäly kutsuu niitä itse työnkulkujen vaatimana.

### `/init` (Projektin alustustaito)
- **Mitä se tekee**: Lukee visiosi `docs/future-project-vision.md` -tiedostosta ja alustaa automaattisesti `.agents/context/` -kansion tiedostot peliäsi varten.
- **Miksi tärkeä**: Säästää aikaa peliprojektin pohjatöissä ja opettaa tekoälylle heti pelin core-loopin ja tyylin.

### `/architect` (Suunnittelutaito)
- **Mitä se tekee**: Pakottaa tekoälyn miettimään ennen koodaamista. Tekoäly luo `implementation_plan.md` -tiedoston ja odottaa ihmisen hyväksyntää.
- **Miksi tärkeä**: Estää raskaan spagettikoodin syntymisen `update()`-funktioihin ja varmistaa, että tekoäly ymmärtää mekaniikan ennen toteutusta.

### `/imprint` (Pelimekaniikan lukitustaito)
- **Mitä se tekee**: Analysoi juuri koodatun pelientiteetin ja poimii siitä talteen pelilliset muuttujat (hitboksit, nopeus, health, animaatio-FPS). Tallentaa nämä säännöt `game-registry.md` -tiedostoon.
- **Miksi tärkeä**: Varmistaa pelin tasapainon (balance) ja visuaalisen yhtenäisyyden. Seuraava vihollinen, jonka tekoäly tekee, pohjautuu samoihin skaaloihin ja nopeuksiin kuin aiemmat.

### `/review` (Katselmointitaito)
- **Mitä se tekee**: Kun ominaisuus on koodattu, tekoäly arvioi oman koodinsa. Se varmistaa, ettei peliluuppiin lisätty muistivuotoja (roskienkeruuongelmia) ja ettei Canvas-renderöinnin aikana mutatoitu tilaa.
- **Miksi tärkeä**: Laadunvarmistus ja FPS:n (ruudunpäivitysnopeuden) ylläpito. Estää huonojen valintojen valumisen koodipohjaan.

### `/optimize` (Koodin optimointitaito)
- **Mitä se tekee**: Purkaa monimutkaista spagettikoodia ja korjaa pelikehityksen suorituskykyongelmia (kuten tarpeetonta roskienkeruuta).
- **Miksi tärkeä**: Pitää pelin suorituskyvyn (FPS) korkeana ja koodipohjan selkeänä.

### `/test` (Testaustaito)
- **Mitä se tekee**: Kirjoittaa, ajaa ja korjaa automaattisia testejä pelin ydinmekaniikoille ja apufunktioille.
- **Miksi tärkeä**: Estää peliä hajoamasta jatkokehityksen aikana.

### `/remember` (Muistintallennustaito)
- **Mitä se tekee**: Tukee `save` ja `restore` argumentteja. Lukee tai kirjoittaa projektin sen hetkisen tilan `memory.md` -tiedostoon.

### `/recover` (Vianpalautustaito)
- **Mitä se tekee**: Kun asiat menevät todella solmuun (tekoäly korjaa samaa virhettä kolmatta kertaa turhaan), ihminen voi komentaa `/recover`. Tekoäly analysoi tilanteen objektiivisesti ja antaa diagnoosin.

---

## 5. Konteksti (`.agents/context/`)

Tämä on pelisi "perustuslaki". Koko tekoälyavusteinen kehitys rakentuu näiden dokumenttien varaan. Pidä huoli, että nämä ovat aina ajan tasalla.
- `architecture.md`: Miten pelilooppi, state, entiteetit ja renderöinti juttelevat toisilleen.
- `game-asset-registry.md`: Listaa pelin spritet, audiot ja resurssit (Assets).
- `ui-registry.md`: Pelin HUDin ja valikoiden visuaaliset säännöt.
- `env-context.md`: Pelin vaatimat ulkoiset rajapinnat ja ympäristömuuttujat.
- `code-standards.md`: Linttaus-säännöt, requestAnimationFrame-käytännöt, suorituskykyvaatimukset.
- `project-overview.md`: Mikä on pelin ydinmekaniikka, tavoite ja laajuus.
- `game-design-context.md`: Pelin visuaaliset säännöt, kuten hitbox-koot, Canvas-resoluutio, paletti ja UI-fontit.

---

## Yhteenveto

**Agentic Game Dev -templatella kehittäminen ei ole pelkkää promptailua. Se on pelituotannon johtamista.** Sinä olet Game Director, tekoäly on tiimisi. 
1. Määrittele suunta ja pelisuunnittelu (`context/`).
2. Valitse työnkulku (`workflows/`).
3. Pakota tekoäly suunnittelemaan mekaniikat ja käyttämään taitojaan (`skills/`).
4. Hyväksy, anna koodata, pelitestaa ja tallenna tila (`/remember`).
