# Hoopoe Digital — UX/UI Design Guide

A practical design system distilled from the **Hoopoe Digital Brand Manual (2019)** and the
**HD Company Profile (Sept 2025)**. Single source of truth for all product, web, and marketing
UI work going forward.

> **Brand evolution note (2025):** Hoopoe has repositioned from a connectivity vendor into the
> **"World's 1st Smart Wi-Fi Marketplace"** — a Spatial Intelligence platform that turns physical
> venues into Intelligent Spaces. The classic warm 2019 palette (orange + cream + navy) is still
> the corporate identity, but the 2025 product expression layers a **dark, neon-accented "Spatial
> Intelligence" theme** on top for product UIs, dashboards, and futuristic marketing. Both
> expressions are documented below — pick the one that fits the surface.

---

## 1. Brand Essence

- **Name:** Hoopoe Digital
- **Symbol:** A stylized hoopoe bird, inspired by King Solomon's hoopoe — a messenger, a guide, a
  carrier of wisdom.
- **Positioning (2025):** *World's 1st Smart Wi-Fi Marketplace.*
- **Tagline (2025):** *Transforming Physical Venues into Intelligent Spaces.*
- **Tagline (legacy / connectivity):** *WiFi on the Go!*
- **Category:** Spatial Intelligence · Smart Wi-Fi · Gen-AI · Digital Twin
- **Voice:** Visionary but pragmatic. Confident, technical, human. Avoid hype words; lead with
  outcomes ("turn footfall into revenue", "no app to download"). Mix editorial serifs for ambition
  with crisp sans for clarity.
- **Mission cue:** "Wi-Fi is the ideal foundation for spatial intelligence — present in virtually
  every venue but vastly underutilized beyond basic connectivity."

### Company facts (Sept 2025)
- **Founded HQ:** Egypt. **EU HQ:** Herengracht 449-A, 1017 BR Amsterdam, Netherlands.
- **Offices / markets:** Egypt, Netherlands, KSA, UAE, Qatar (UK & Canada in the make).
- **Scale of impact:** 18 marketplace products · 14K+ AP subscriptions · 50+ venues ·
  2.5M registered users · 13M+ sessions · 1.6M daily interactions.
- **Compliance:** GDPR · CCPA · Saudi PDPL · Egypt DPL.
- **Recognitions:** WITSA Top 14 most innovative startups worldwide (Oct 2024) · AfICTA
  Innovation Award of the Year (Dec 2024) · CairoICT Top Tech Startup (Nov 2023) · Top-3 Hajj &
  Umrah Challenge, Al-Madinah (Apr 2025).
- **Customers:** Amazon, Ooredoo, MARAKEZ (District 5), Mall of Tanta, McDonald's, Burger King,
  Café Vergnano, Junior's, Al Mana, Sigma 66, RISEUP Summit, Egypt VC Summit, TechForge,
  Harmont&Blaine, and more.
- **Strategic partners:** e&, Cequens, VictoryLink, Twilio, Msegat, Paymob, Infobip, Huawei,
  Ruijie, Cambium Networks, MikroTik, Oracle Micros Symphony, Foodics, Grubtech, POSRocket.
- **Web:** www.hoopoe.digital · **Email:** info@hoopoe.digital
- **Social:** facebook/hoopoe.digital.kingdom · X @HoopoeDigital · IG @hoopoe.digital · LinkedIn hoopoe-digital

---

## 2. Logo

### Variants
| Variant | Use |
|---|---|
| **Horizontal full logo** (symbol + "HOOPOE DIGITAL") | Default for headers, websites, documents |
| **Vertical full logo** (symbol above wordmark) | Square crops, social avatars (with padding), posters |
| **Symbol only (marquee icon)** | Favicons, app icons, loaders, watermarks ≤ 32px contexts |

### Color treatments (approved)
- Full color (orange + dark) on **white**
- White on **brand orange** (`#CE8345`)
- White on **dark navy** (`#252A35` / `#20242C`)
- Single-color dark on **light gray** (`#E8E3E1`)

### Clearspace
Maintain a clearspace of **`X` on every side**, where `X` equals the height of the "H" in the
wordmark (or the height of the bird's head for the symbol). Never let any element enter that
zone.

### Minimum sizes
- Horizontal logo: **120 px** wide on screen / **40 px** tall minimum.
- Symbol only: **24 px** square minimum.

### Don'ts
- Don't rotate, distort, or skew.
- Don't crop the logo.
- Don't recolor any element.
- Don't rescale internal parts (bird vs wordmark).
- Don't add effects (drop shadow, glow, outline, gradient).
- Don't redraw.

---

## 3. Color System

Hoopoe runs **two coordinated palettes**:

- **A. Corporate / Editorial palette (2019)** — warm, natural, used for the logo, stationery,
  marketing print, light marketing web pages, and any "human, trustworthy" surface.
- **B. Spatial Intelligence palette (2025)** — dark, neon, used for product UI, dashboards,
  pitch decks, futuristic hero sections and anything that says "AI / data / spatial".

Both palettes share the same brand orange so the bird mark always feels at home.

### A. Corporate / Editorial palette

Drawn from the natural colors of the hoopoe bird. Orange is the primary accent, dark navy is the
dominant text/background contrast, warm neutrals are surfaces.

### Core palette

| Token | Name | HEX | RGB | Role |
|---|---|---|---|---|
| `--color-orange-500` | **Orange (Primary)** | `#D1824F` | 209, 130, 79 | Primary brand color, CTAs, highlights |
| `--color-orange-600` | Mid Orange | `#EA9F68` | 234, 159, 104 | Hover/secondary accent |
| `--color-orange-300` | Light Orange | `#FACEA3` | 250, 206, 163 | Backgrounds, badges, illustration fills |
| `--color-orange-700` | Deep Orange | `#CE8345` | 206, 131, 69 | Pressed state, footer band, print accent |
| `--color-brown-700` | Brown | `#A5462A` | 165, 70, 42 | Warnings, supporting accent, illustration shadow |
| `--color-navy-900` | Dark Navy (Secondary) | `#252A35` | 37, 42, 53 | Primary text, dark surfaces, app bars |
| `--color-black` | Black | `#000000` | 0, 0, 0 | Pure black — use sparingly, prefer Navy |
| `--color-gray-100` | Light Gray | `#E8E3E1` | 232, 227, 225 | Page background, cards, dividers |
| `--color-cream` | Cream / Off-white | `#F9CF9D` *(tint)* | — | Soft section backgrounds |
| `--color-white` | White | `#FFFFFF` | 255, 255, 255 | Surfaces, reversed text |

> Source HEX values in the manual: `#20242C`, `#E8E3E1`, `#A34823`, `#CE8345`, `#E7A15E`, `#F9CF9D`,
> plus `#000000`, `#EBE2E0`, `#A5462A`, `#D1824F`, `#EA9F68`, `#FACEA3`, and secondary `#252A35`.

### Tints
Each main color must support **100 / 80 / 60 / 40 / 20%** opacity steps for charts, hovers, and
backgrounds — exactly as specified in the manual.

### Usage rules
- **60 / 30 / 10 rule:** 60% neutral (white / light gray), 30% dark navy, 10% orange accent.
- Orange is the *only* color allowed for primary CTAs and key interactive emphasis.
- Never place brand orange directly on brown — insufficient contrast.
- Body text: **Navy `#252A35` on white** or **white on Navy**. Never pure black on orange.

### Accessibility (WCAG 2.2 AA targets)
| Pair | Ratio | Verdict |
|---|---|---|
| Navy `#252A35` on White | 13.8:1 | AAA — body text |
| White on Orange `#D1824F` | 2.7:1 | ❌ Fails for body. Use only for **large text ≥ 24px / icons**, or switch to Navy on Orange |
| Navy `#252A35` on Orange `#D1824F` | 5.1:1 | ✅ AA for normal text — preferred CTA combo |
| Navy on Light Gray `#E8E3E1` | 11.6:1 | ✅ AAA |
| White on Navy `#252A35` | 13.8:1 | ✅ AAA |

**CTA recommendation:** Background `#D1824F`, label `#252A35`, **bold weight**.

### B. Spatial Intelligence palette (2025 product expression)

A near-black canvas with a faint dotted grid, lit by category-coded neon accents. Each Hoopoe
**product line** owns one neon color so users instantly recognize where they are.

| Token | Name | HEX | Role |
|---|---|---|---|
| `--bg-deep` | Deep Space | `#0A0E14` | App / page background |
| `--bg-surface` | Surface | `#11161F` | Cards, panels |
| `--bg-elevated` | Elevated | `#1A2230` | Modals, popovers, hover |
| `--stroke` | Stroke | `#2A3344` | Borders, dividers, dot grid |
| `--text-hi` | Text High | `#F2F4F8` | Headings, primary text on dark |
| `--text-mid` | Text Mid | `#A8B0BE` | Body text on dark |
| `--text-low` | Text Low | `#6B7385` | Captions, hints |
| `--accent-orange` | **Brand Orange** *(shared with palette A)* | `#F39C2A` | Cross-brand accent, primary CTA on dark, hoopoe mark |
| `--accent-green` | Smart-Services Green | `#6FE36A` | Wi-Fi Smart Services (B2B) |
| `--accent-magenta` | Instant-Apps Magenta | `#E45BCB` | Wi-Fi Instant Apps (B2B2C) |
| `--accent-cyan` | BI Cyan | `#4FD3E3` | Wi-Fi Business Intelligence |
| `--accent-yellow` | Ad-Manager Yellow | `#F4D03F` | Location-Intelligent Marketing / Ad Manager |
| `--accent-red` | Alert Red | `#FF5C5C` | Errors, critical alerts |

**Glow effect (use sparingly):** `box-shadow: 0 0 24px rgba(<accent>, .35), 0 0 1px rgba(<accent>, .8);`

### Color → product mapping (brand law)

| Product line | Accent | Where it appears |
|---|---|---|
| Wi-Fi Smart Services | Green `#6FE36A` | Section headers, icons, charts |
| Wi-Fi Instant Apps | Magenta `#E45BCB` | Section headers, app cards |
| Wi-Fi Business Intelligence | Cyan `#4FD3E3` | Dashboards, charts |
| Location-Intelligent Marketing | Yellow `#F4D03F` | Ad Manager, campaign UI |
| Cross-brand / corporate | Orange `#F39C2A` | Logo, primary CTAs, brand moments |

> Don't mix more than **one product accent** in a single screen unless you're showing the
> marketplace overview. The orange brand accent may always coexist with one product accent.

### Accessibility on dark
- Body text: `#A8B0BE` on `#0A0E14` → 9.0:1 ✅
- Headings: `#F2F4F8` on `#0A0E14` → 16.6:1 ✅
- Neon accents on `#0A0E14`: cyan / green / yellow all pass AA for ≥18px text and icons. Magenta
  `#E45BCB` only passes for large text — use it for headlines and icons, not body.

---

## 4. Typography

### Brand typeface (display / logo)
- **Gabriela Stencil** — `Thin, Ultra Light, Light, Regular, Bold, Black`
- Use *only* for the logo wordmark, hero headlines, and editorial display moments.
- Never use Gabriela Stencil for body, UI labels, or anything below 32 px.

### Available font assets in this repo
The repo ships with the **Thmanyah** family (`fonts/`), which provides Latin + Arabic coverage and
matches the brand's editorial spirit. Use these as the working UI/editorial fonts:

| Family | Weights | Recommended Use |
|---|---|---|
| **Thmanyah Serif Display** | Light, Reg, Medium, Bold, Black | H1 / hero headlines, marketing display |
| **Thmanyah Serif Text** | Light, Regular, Medium, Bold, Black | Long-form reading (articles, blog) |
| **Thmanyah Sans** | Light, Regular, Medium, Bold, Black | UI body, buttons, labels, tables, forms |

### Type scale (8 pt baseline, web)

| Token | Size / Line | Weight | Family | Use |
|---|---|---|---|---|
| `display-xl` | 64 / 72 | Black | Gabriela Stencil **or** Thmanyah Serif Display | Hero |
| `display-lg` | 48 / 56 | Bold | Thmanyah Serif Display | Section hero |
| `h1` | 36 / 44 | Bold | Thmanyah Serif Display | Page title |
| `h2` | 28 / 36 | Bold | Thmanyah Serif Display | Section |
| `h3` | 22 / 30 | Medium | Thmanyah Sans | Sub-section |
| `h4` | 18 / 26 | Medium | Thmanyah Sans | Card title |
| `body-lg` | 18 / 28 | Regular | Thmanyah Sans / Serif Text | Long-form lede |
| `body` | 16 / 24 | Regular | Thmanyah Sans | Default body |
| `body-sm` | 14 / 20 | Regular | Thmanyah Sans | Secondary text |
| `caption` | 12 / 16 | Medium | Thmanyah Sans | Labels, captions |
| `overline` | 11 / 16 | Bold, +1 tracking, UPPERCASE | Thmanyah Sans | Eyebrows, tags |

### Rules
- **One display family per screen.** Don't mix Gabriela Stencil and Thmanyah Serif Display in the
  same composition.
- Body line-length: **60–75 characters**.
- Numerals: tabular for tables, proportional for prose.
- Arabic: use Thmanyah's Arabic glyphs at +1 size step (Arabic reads ~10% smaller optically).

---

## 5. Spacing, Layout & Grid

### Spacing scale (4 pt base)
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

### Grid
- **Desktop (≥1280):** 12 columns, 80 px margins, 24 px gutters, max content 1200.
- **Tablet (768–1279):** 8 columns, 32 px margins, 20 px gutters.
- **Mobile (<768):** 4 columns, 16 px margins, 16 px gutters.

### Radii
- `sm` 4 — inputs, chips
- `md` 8 — buttons, cards (default)
- `lg` 16 — modals, feature cards
- `pill` 9999 — tags, avatars

### Elevation
Keep shadows soft and warm-tinted (avoid pure black).
- `e1`: `0 1px 2px rgba(37,42,53,0.06)`
- `e2`: `0 4px 12px rgba(37,42,53,0.08)`
- `e3`: `0 12px 32px rgba(37,42,53,0.12)`

---

## 6. Iconography & Imagery

- **Icons:** 24 px grid, 1.5 px stroke, rounded joins. Stroke color = current text color (or the
  product accent on dark surfaces).
- **Editorial motif (palette A):** the dotted **constellation / network pattern in orange** from
  the 2019 stationery. Use at 10–20% opacity for empty states, login screens, dividers.
- **Spatial Intelligence motif (palette B):** a fine **dot grid** (`18px × 18px`, `#2A3344` on
  `#0A0E14`) plus **glowing nodes and connection lines** in the active product accent. Used for
  hero backgrounds, dashboards, and "venue → intelligent space" diagrams.
- **3D / render style (2025):** futuristic isometric scenes — venues with translucent blue/purple
  data overlays, neon node markers, holographic dashboards. Used in pitch decks and hero banners.
  Keep human silhouettes small and outlined; avoid stock photography.
- **Editorial photography (palette A):** natural light, warm tones, real people, generous
  negative space. Use for the corporate "About / Team / Press" surfaces.

---

## 6b. Product Taxonomy (the Smart Wi-Fi Marketplace)

The Hoopoe marketplace is organized into **4 product lines**, each with a dedicated accent color
(see §3.B). When designing any product surface, lead with the line's accent and follow its naming.

### Line 1 — Wi-Fi Smart Services *(B2B · accent green `#6FE36A`)*
Tools that empower venue operators with advanced hotspot management.
- **Modern Guest Wi-Fi (WMC)** — Wi-Fi Management Cloud: branded splash pages, auth methods
  (phone, social, voucher, email), packages, blacklist/whitelist. *"Deal with your hotspot as if
  you are a Mobile Network Operator."*
- **Cloud-AAA as a Service** — Carrier-grade RADIUS/AAA. Supports EAP-TLS, EAP-TTLS, PEAP,
  EAP-SIM, EAP-AKA, EAP-FAST, EAP-GTC, EAP-MD5 and Hotspot 2.0. *Suitable for: Enterprises,
  Network Operators, Solutions Providers, System Integrators.*
- **Indoor Tracking & Positioning (ITP)** — Wi-Fi-powered real-time tracking of visitors and
  assets, **1–3 m accuracy**, no extra hardware. *Suitable for: Malls, Hospitals, Airports,
  Museums, Exhibitions, Stations, Resorts, Enterprise.*
- **Wi-Fi in Public Transportation** — Turnkey in-transit Wi-Fi with hardware that also enables
  fleet tracking, multi-SIM aggregation, failover. *Trains, Buses, Limos & Taxis, Metros,
  Airplanes.*
- **Wi-Fi 3rd Party Integrations** — POS & ERP (13+ brands), CRM, DPI, Spotify, reservation &
  queuing, access control, monitoring.

### Line 2 — Wi-Fi Instant Applications *(B2B2C · accent magenta `#E45BCB`)*
Location-intelligent apps that **appear automatically on connect, vanish on disconnect — zero
downloads required**.
- **Wi-Fi Intelligent Menu** — POS-integrated, branded ordering & loyalty for restaurants,
  cafes, food courts, drive-thrus.
- **HEPlex (Hoopoe Entertainment Plex)** — Netflix-like local streaming over venue Wi-Fi:
  movies, TV, music, multiplayer games. For transportation, hospitality, waiting areas.
- **Intelligent Mapping & Wayfinding** — 3D interactive indoor maps, multi-floor, built in 1–2
  weeks. **Live Navigation (Blue Dot)** with sub-meter accuracy + **Dynamic Navigation** without
  Wi-Fi. Malls, airports, museums, campuses.
- **Doarak — Intelligent Queuing System** — Hardware-less, paper-less, touch-less queuing with
  ML-based wait-time predictions and SMS / WhatsApp / voice notifications. Banks, CS centers,
  post offices, hospitals, clinics, DMV.
- **Wi-Fi Digital Jukebox** — Guests pick songs from the venue playlist via Wi-Fi.
  Restaurants, cafes, pubs, clubs.

### Line 3 — Wi-Fi Business Intelligence *(accent cyan `#4FD3E3`)*
Turning passive Wi-Fi signals into actionable BI — capturing data from **connected and
unconnected** devices, anonymized.
- **Basic Wi-Fi Analytics** — Users, devices, sessions (accepted/rejected), live & historical.
- **Location Analytics & Advanced BI** — Associated/unassociated users, capture rate, dwell-time
  groups, median visit duration, visitor loyalty, repeat-visitor rate, footfall trends, zone
  heatmaps, customer journey flows.
- **Application-Specific User Data** — 360° guest profiles aggregated across Intelligent Menu,
  HEPlex, Doarak, Jukebox, Navigator, Indoor Tracking.
- **Deep Packet Inspection (DPI)** — Per-user and aggregate traffic categorization (Facebook,
  WhatsApp, Streaming, etc.).
- **Google Analytics & Tracking Pixels** — Embedded directly in captive portals and Instant Apps
  for unified physical + digital funnels.

### Line 4 — Location-Intelligent Marketing *(accent yellow `#F4D03F`)*
- **Hoopoe Ad Manager** — *World's first stand-alone Wi-Fi Ad Manager.* Targets Wi-Fi users by
  location, instant apps used, and behavioral data captured through Wi-Fi. UI modules:
  Locations, Campaigns, Assets, Audience, Performance, Payments.

---

## 6c. Customer Segments

When sizing a product page or pitch surface, anchor it in one of these six segments. Each gets a
short pictogram-style icon (24px, 1.5px stroke, palette-A navy or palette-B accent).

| # | Segment | Examples |
|---|---|---|
| 1 | **Public Venues** | Malls, museums, cultural centers |
| 2 | **Food & Beverage** | Restaurants, cafes, food courts, drive-thrus |
| 3 | **Events & Exhibitions** | Conferences, expos, summits |
| 4 | **Transportation Hubs** | Airports, metro stations, bus terminals |
| 5 | **Enterprise Buildings** | Offices, business parks, campuses |
| 6 | **Customer Service Centers** | Banks, clinics, post offices, DMV |

---

## 7. Component Patterns

### Buttons
| Variant | Background | Label | Border | Notes |
|---|---|---|---|---|
| **Primary** | `#D1824F` | `#252A35` Bold | none | Default CTA |
| **Primary (dark surface)** | `#D1824F` | `#FFFFFF` Bold | none | On Navy backgrounds |
| **Secondary** | transparent | `#252A35` | 1.5 px `#252A35` | Outline |
| **Tertiary / Link** | none | `#CE8345` underline on hover | none | Inline |
| **Destructive** | `#A5462A` | `#FFFFFF` | none | Sparingly |
| **Disabled** | `#E8E3E1` | `#252A35` @ 40% | none | Non-interactive |

Button anatomy: height **44 px** (mobile) / **40 px** (desktop), horizontal padding **20 px**, radius **8**.

### Forms
- Input height 44 px, radius 8, 1 px border `#252A35` @ 24%, focus ring 2 px `#D1824F`.
- Labels above field, `caption` token, color `#252A35` @ 80%.
- Errors in `#A5462A` with a 16 px alert icon.

### Cards
- Background `#FFFFFF`, border `#E8E3E1`, radius `lg`, shadow `e1`, padding 24.
- Featured card: 4 px top border in `#D1824F`.

### Navigation
- App bar: white background, 64 px tall, `e1` shadow on scroll, logo left, primary nav center, CTA right.
- Active link: 2 px underline in `#D1824F`, label in Navy Bold.

### Status / feedback
| State | Color | Background |
|---|---|---|
| Success | `#2F7D5B` | `#E6F2EC` |
| Warning | `#CE8345` | `#FACEA3` |
| Error | `#A5462A` | `#F6E1DA` |
| Info | `#252A35` | `#E8E3E1` |

---

## 8. Motion

- **Durations:** 120 ms (micro), 200 ms (default), 320 ms (large surfaces).
- **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)` for enter, `cubic-bezier(0.4, 0, 1, 1)` for exit.
- Avoid bouncy/elastic curves — they conflict with the editorial brand tone.
- Respect `prefers-reduced-motion`.

---

## 9. Tone of Voice (microcopy)

- **Clear over clever.** "Start session" beats "Take flight!"
- **Active, second person.** "You're connected" not "Connection established."
- **Warm but precise.** Short sentences, no jargon, no emoji in product UI.
- **Capitalization:** Sentence case for buttons, labels, and titles. UPPERCASE only for `overline`.

---

## 10. Do / Don't quick reference

✅ Do
- Lead with white space and let the orange accent earn its attention.
- Use Navy for text, Orange for action, Light Gray for surfaces.
- Pair the bird symbol with generous clearspace.
- Reuse the dotted constellation motif for decorative moments.

❌ Don't
- Don't recolor, rotate, or add effects to the logo.
- Don't put white text on `#D1824F` for body copy (fails AA).
- Don't mix Gabriela Stencil with another display serif on the same screen.
- Don't introduce new accent colors outside this palette without updating this guide.

---

## 11. Design Tokens (starter)

```json
{
  "color": {
    "brand": {
      "orange":      "#D1824F",
      "orangeDeep":  "#CE8345",
      "orangeMid":   "#EA9F68",
      "orangeLight": "#FACEA3",
      "brown":       "#A5462A",
      "navy":        "#252A35",
      "black":       "#000000",
      "grayLight":   "#E8E3E1",
      "white":       "#FFFFFF"
    },
    "spatial": {
      "bgDeep":      "#0A0E14",
      "bgSurface":   "#11161F",
      "bgElevated":  "#1A2230",
      "stroke":      "#2A3344",
      "textHi":      "#F2F4F8",
      "textMid":     "#A8B0BE",
      "textLow":     "#6B7385",
      "orange":      "#F39C2A",
      "smartGreen":  "#6FE36A",
      "instantMagenta": "#E45BCB",
      "biCyan":      "#4FD3E3",
      "adYellow":    "#F4D03F",
      "alertRed":    "#FF5C5C"
    },
    "product": {
      "smartServices":  "#6FE36A",
      "instantApps":    "#E45BCB",
      "businessIntel":  "#4FD3E3",
      "adManager":      "#F4D03F"
    },
    "text":     { "primary": "#252A35", "secondary": "#252A35CC", "inverse": "#FFFFFF" },
    "surface":  { "default": "#FFFFFF", "muted": "#E8E3E1", "dark": "#252A35" },
    "feedback": { "success": "#2F7D5B", "warning": "#CE8345", "error": "#A5462A", "info": "#252A35" }
  },
  "font": {
    "display": "\"Gabriela Stencil\", \"Thmanyah Serif Display\", serif",
    "serif":   "\"Thmanyah Serif Text\", Georgia, serif",
    "sans":    "\"Thmanyah Sans\", system-ui, sans-serif"
  },
  "radius":  { "sm": 4, "md": 8, "lg": 16, "pill": 9999 },
  "spacing": [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
}
```

---

## 12. Asset inventory in this repo

- `Branding_Manual.pdf` — 2019 brand manual (logo, type, color, stationery).
- `HD - Company Profile (SEPT2025).pdf` — 2025 company profile (positioning, marketplace,
  product taxonomy, customers, partners, scale, recognitions).
- `hoopoe-digital-logo.jpeg` — raster horizontal logo (request SVG from brand owner before production use).
- `fonts/thmanyah-sans/` — UI sans family, 5 weights.
- `fonts/thmanyah-serif-display/` — display serif, 5 weights.
- `fonts/thmanyah-seriftext/` — text serif, 5 weights.

> **Action items:**
> 1. Request vector (SVG/AI) versions of the logo and the Gabriela Stencil license from the brand owner.
> 2. Get individual SVG icons for the 18 marketplace products and the 6 customer-segment pictograms.
> 3. Get the 3D render source files (or commission a render set) for the Spatial Intelligence hero scenes.
> 4. Confirm the official 2025 hex values for the neon accents — the values in §3.B are
>    eyedropped from the company profile and should be ratified by the brand team.

---

*Maintainer note: this guide is derived from the Hoopoe Digital Brand Manual (2019) and the
HD Company Profile (Sept 2025). When the brand evolves, update this file in the same PR as any
token changes so engineering and design stay in sync.*
