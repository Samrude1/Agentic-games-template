# Game Design Document (GDD)

Tämä dokumentti on pelin toiminnallinen suunnitelma ja "totuuden lähde" (Single Source of Truth). Kaikki pelimekaniikat, kontrollit ja säännöt määritellään tässä.

---

## 1. Yleiskatsaus (Overview)
- **Pelin nimi**: [Pelin nimi]
- **Genre**: [esim. Arcade Shooter, Tasoloikka, Roguelite, Pulmapeli]
- **Alustat**: Desktop (Web) ja Mobiili (Kosketusnäyttö)
- **Kohdeyleisö & Teema**: [esim. Retro sci-fi neon cyberpunk, nopeatempoinen reflexipeli]
- **Visuaalinen tyyli**: [esim. Vektori-glow, pixel art, minimalistinen geometrinen]

---

## 2. Pääpelisilmukka (Core Loop)
```
[Toiminta: Pelaaja liikkuu ja reagoi]
              ↓
[Haaste: Viholliset, esteet, aikaraja]
              ↓
[Palkinto: Pisteet, power-upit, kombo-kertoimet]
              ↓
[Eteneminen tai Game Over & Uusi yritys]
```

Kuvaile tässä pelaajan toiminnot sekunti-sekunnilta:
- Mitä pelaaja tekee 90% ajasta?
- Mikä aiheuttaa pelaajalle haasteen tai uhan?
- Miten pelaaja palkitaan onnistumisesta?

---

## 3. Pelaajan ohjaus & Kontrollit (Input Mapping)

### Näppäimistö & Hiiri (Desktop)
| Toiminto | Näppäin | Selite |
| :--- | :--- | :--- |
| Liikkuminen | Nuolinäppäimet / WASD | 4-suuntainen / 8-suuntainen liike |
| Ensisijainen toiminto (Ammus / Hyppy) | Välilyönti | Päätoiminto |
| Toissijainen toiminto (Dash / Pommi) | Shift / Z / Hiiren oikea | Erikoistoiminto |
| Tähtäys | Hiiren osoitin | Virtuaalikoordinaatit |
| Pause / Valikko | Esc / P | Pelin pysäytys |

### Kosketusohjaus (Mobiili)
| Toiminto | Kosketuselementti | Selite |
| :--- | :--- | :--- |
| Liikkuminen | Virtuaali-D-pad tai pyyhkäisy | Vasen alakulma |
| Toiminnot | Virtuaalinapit A ja B | Oikea alakulma |

---

## 4. Pelimekaniikat ja Säännöt

### Pelaajahahmo / Alus
- Liikenopeus, kiihtyvyys ja kitka
- Kestopisteet (HP) tai elämät (Lives)
- Aseistus, ammukset tai erikoisliikkeet

### Viholliset & Esteet
- Vihollistyypit ja niiden tekoäly (AI / liikeradat)
- Spawnauslogiikka (aikapohjainen, aallot, kiihtyvä vaikeustaso)
- Osumat ja vahingonlaskenta

### Pisteytys & Tavoitteet
- Miten pisteitä kertyy (vihollisten tuhoaminen, kerätyt esineet, elossaoloaika)
- Kombojeli ja kertoimet
- Parhaan tuloksen tallennus (`localStorage`)

---

## 5. Äänimaailma (Audio Design)
Kaikki äänet toteutetaan koodipohjaisella Web Audio API -synteesillä:
- **Pelaajan toiminnot**: Hyppy, laukaus, dash
- **Tapahtumat**: Osuma, räjähdys, kolikko/bonus
- **Pelin tila**: Voittofanfaari, Game Over -ääni, taustasyke/musiikki
