# Projektivisio (Templaatti)

*Tämä on pohja projektin visiodokumentille. Kun aloitat uuden projektin, täytä tämä tiedosto (tai luo uusi vastaava, esim. `project-vision.md`) ja korvaa alla olevat kohdat oman projektisi tiedoilla. Tekoälyagentti käyttää tätä dokumenttia arkkitehtuurin ja koodin suunnittelun perustana.*

---

## 1. Ydinkonsepti
*Kirjoita tähän lyhyesti (1-3 lausetta) mikä sovellus on kyseessä, mitä ongelmaa se ratkoo ja mikä sen ydinajatus on.*

**Esimerkki:**
> Yksinkertainen "Ideaseinä", johon tiimin jäsenet voivat jättää ideoita ja äänestää muiden ideoita. Tavoitteena on kerätä paras palaute talteen nopeasti ja tehokkaasti.

## 2. Pääominaisuudet (MVP)
*Listaa sovelluksen tärkeimmät toiminnot (MVP eli Minimum Viable Product -tasolla). Pidä lista ytimekkäänä, jotta agentti ymmärtää heti, mihin asioihin sen tulee keskittyä ensimmäisenä.*

1. **Ominaisuus 1:** Kuvaus siitä, mitä käyttäjä voi tehdä (esim. Käyttäjä voi kirjautua sisään sähköpostilla).
2. **Ominaisuus 2:** ...
3. **Ominaisuus 3:** ...

## 3. Kohderyhmä ja Julkaisu
*Kenelle sovellus on suunnattu? Minne se on tarkoitus julkaista?*

- **Kohderyhmä:** (Esim. Sisäinen tiimi, kuluttajat, B2B-asiakkaat...)
- **Julkaisualusta:** (Esim. Frontend Verceliin, tietokanta MongoDB Atlasiin...)

## 4. Teknologiapino ja Integraatiot
*Onko sinulla jotain erityisiä vaatimuksia käytettäville teknologioille (tämän templaatin Next.js, React ja Tailwind -pohjan lisäksi)?*

- **Tietokanta:** (Esim. PostgreSQL, MongoDB, Supabase...)
- **Autentikaatio:** (Esim. NextAuth, Clerk, omat JWT-tokenit...)
- **Muut integraatiot:** (Esim. Stripe-maksut, OpenAI API, AWS S3...)

## 5. Suunnittelu ja muut reunaehdot (Valinnainen)
*Tänne voit kirjata ylös asioita, joihin agentin tulisi kiinnittää erityistä huomiota.*

- **Visuaalinen tyyli:** (Esim. Tumma teema, minimalistinen Apple-tyylinen design...)
- **Muuta huomioitavaa:** (Esim. Erityiset tietoturvavaatimukset tai skaalautuvuus.)
