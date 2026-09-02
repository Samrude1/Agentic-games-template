# Pelin Tyyliopas & Design System (STYLE_GUIDE)

Tämä dokumentti on pelin käyttöliittymän, typografian ja visuaalisen ilmeen virallinen "totuuden lähde". Jokaisen agentin ja kehittäjän tulee noudattaa näitä määrityksiä. Ad-hoc -tyylejä, satunnaisia heksavärejä tai omatekoisia painikkeita ei sallita koodissa ilman tämän oppaan päivittämistä.

---

## 1. Värijärjestelmä (CSS Custom Properties)

Kaikki värit ja efektit määritellään `style.css`-tiedoston `:root`-lohkossa:

```css
:root {
  /* Taustat ja Paneelit */
  --bg-color: #0b0f19;                    /* Pelin taustaväri */
  --panel-bg: rgba(15, 23, 42, 0.85);     /* Ikkunoiden ja modaalien tausta */
  --overlay-bg: rgba(11, 15, 25, 0.85);   /* Tummennettu tausta modaaleille */
  --border-color: rgba(255, 255, 255, 0.1);/* Hienovarainen reunaviiva */

  /* Brändi & Toimintovärit */
  --primary: #38bdf8;                     /* Ensisijainen toimintoväri (Cyan/Sky) */
  --primary-hover: #0ea5e9;               /* Ensisijaisen hover-tila */
  --secondary: #64748b;                   /* Toissijainen väri (Slate) */
  --secondary-hover: #475569;             /* Toissijaisen hover-tila */
  --accent: #f43f5e;                      /* Korostus / Vahinko / Vihollinen (Rose) */
  --success: #10b981;                     /* Onnistuminen / Pisteet (Emerald) */
  --warning: #f59e0b;                     /* Varoitus / Kulta (Amber) */

  /* Tekstivärit */
  --text-main: #f8fafc;                   /* Pääteksti (vaalea) */
  --text-muted: #94a3b8;                  /* Toissijainen / himmeä teksti */

  /* Pyöristykset & Varjot */
  --radius-sm: 0.375rem;                  /* 6px pienille napeille/badgeille */
  --radius-md: 0.5rem;                    /* 8px vakiopainikkeille */
  --radius-lg: 1rem;                      /* 16px modaaleille ja paneeleille */
  --shadow-box: 0 10px 30px rgba(0, 0, 0, 0.7);
  --shadow-glow: 0 4px 15px rgba(56, 189, 248, 0.4);
}
```

---

## 2. Typografia

- **Fonttiperhe**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (tai pikselipeleissä erikseen määritelty retro-fontti).
- **Otsikot (H1 - H3)**:
  - `H1`: 2.2rem, lihavoitu (800), lineaarinen liukuväri (`linear-gradient(135deg, var(--primary) 0%, #818cf8 100%)`).
  - `H2`: 1.5rem, lihavoitu (700), väri `--text-main`.
  - `H3`: 1.2rem, puolilihava (600), väri `--text-muted`.
- **Leipäteksti**: 1rem, väri `--text-muted`, riviväli 1.5.
- **HUD & Pistenäyttö**: Tasavälinen (monospace) tai selkeä sans-serif, hyvä kontrasti pelitaustaan nähden.

---

## 3. Painikkeiden Komponenttikirjasto (Button Components)

Kaikkien pelin painikkeiden tulee käyttää yhtä seuraavista luokista:

### A. Ensisijainen painike (`.btn-primary`)
Pelin käynnistys, vahvistus, restart:
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, #2563eb 100%);
  color: #fff;
  border: none;
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: var(--shadow-glow);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(56, 189, 248, 0.6);
}
.btn-primary:active {
  transform: translateY(1px);
}
```

### B. Toissijainen painike (`.btn-secondary`)
Asetukset, takaisin, pause-valikon toissijaiset valinnat:
```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}
```

### C. Mobiilin kosketuspainikkeet (`.touch-btn`)
Suuntanapit ja toimintonapit kosketusnäytöille:
- Läpikuultava tausta (`backdrop-filter: blur(4px)`), ympyrän muoto (`border-radius: 50%`).
- Aktiivinen tila: korostusväri ja kevyt kutistus (`scale(0.92)`).

---

## 4. Modaalit, Ikkunat ja Overlayt

- **Taustan tummennus**: `.overlay` - `position: absolute; inset: 0; backdrop-filter: blur(8px);`
- **Ikkunasisältö**: `.overlay-content`
  - Tausta: `var(--panel-bg)`
  - Reunus: `1px solid var(--border-color)`
  - Pyöristys: `var(--radius-lg)`
  - Avausanimaatio: `animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);`

---

## 5. Tyylisäännöt koodaukselle (Rules of Thumb)

1. **Ei koskaan heksakoodeja suoraan luokkiin**: Käytä aina `var(--primary)`, `var(--bg-color)` jne.
2. **Ei koskaan suoria `style="..."` -attribuutteja painikkeisiin**.
3. **Canvas-värien synkronointi**: Jos piirrät pelaajan tai vihollisen canvasiin, käytä samoja heksakoodeja kuin `:root`-muuttujissa:
   - Pelaaja: `#38bdf8` (`--primary`)
   - Viholliset/Vaara: `#f43f5e` (`--accent`)
   - Kolikot/Bonus: `#f59e0b` (`--warning`) tai `#10b981` (`--success`)
