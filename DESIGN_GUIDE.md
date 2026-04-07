# Hoopoe Digital — UX/UI Design Guide

A practical design system distilled from the official **Hoopoe Digital Brand Manual (2019)** and the
brand assets included in this repository. Use this as the single source of truth for all product,
web, and marketing UI work going forward.

---

## 1. Brand Essence

- **Name:** Hoopoe Digital
- **Symbol:** A stylized hoopoe bird, inspired by King Solomon's hoopoe — a messenger, a guide, a
  carrier of wisdom. The mark should always feel natural, warm, and confident.
- **Voice:** Professional, modern, warm, trustworthy. Avoid stiff/corporate tone; favor clarity.
- **Tagline (from collateral):** *"WiFi on the Go!"*

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

The palette is drawn from the natural colors of the hoopoe bird. Use **orange** as the primary
accent, **dark navy** as the dominant text/background contrast, and the warm neutrals as surfaces.

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

- **Icons:** 24 px grid, 1.5 px stroke, rounded joins. Stroke color = current text color.
- **Illustration motif:** the manual uses a recurring **constellation / dotted-network pattern in
  orange** (visible on the business card and letterhead). Reuse it as a decorative background motif
  for empty states, login screens, and section dividers. Keep at 10–20% opacity.
- **Photography:** natural light, warm tones, real people, plenty of negative space. Avoid stock-y
  blue corporate imagery.

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

- `Branding_Manual.pdf` — full 2019 brand manual (logo, type, color, stationery).
- `hoopoe-digital-logo.jpeg` — raster horizontal logo (request SVG from brand owner before production use).
- `fonts/thmanyah-sans/` — UI sans family, 5 weights.
- `fonts/thmanyah-serif-display/` — display serif, 5 weights.
- `fonts/thmanyah-seriftext/` — text serif, 5 weights.

> **Action item:** request vector (SVG/AI) versions of the logo and the original Gabriela Stencil
> license file from the brand owner before the first production release.

---

*Maintainer note: this guide is derived from the official Hoopoe Digital Brand Manual (2019).
When the brand evolves, update this file in the same PR as any token changes so engineering and
design stay in sync.*
