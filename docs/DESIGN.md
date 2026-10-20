# listobox — Style Reference (Updated with Google Fonts)

> farm-stand chalkboard at golden hour

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Sweetgreen's design system is a warm, farm-stand-meets-modern-typography aesthetic: a cream canvas (#f4f3e7) rooted in natural materials, with deep forest green as the structural anchor and electric lime (#e6ff55) as a singular, high-energy action color. Photography carries the brand — saturated, overhead food shots on warm tile, ceramic, and concrete surfaces are treated as heroes, never as decoration. Typography does the heavy lifting on chrome: Plus Jakarta Sans renders oversized category labels and hero headlines at extreme weights (400 at 70–80px, with 0.85 line-height that lets letters nearly touch), while Plus Jakarta Sans (ultra-light 200) creates contrast through restraint as a secondary editorial accent. Components are deliberately spare — pill-shaped buttons, ghost text links with arrows, badge-free product cards — letting the food and the headline typography own every screen.

## Tokens — Colors

| Name | Value | Token | Role |
| :---- | :---- | :---- | :---- |
| Deep Forest | `#00473c` | `--color-deep-forest` | Primary brand color, nav logo, dark pill buttons, text accents, badge borders, link colors — the structural green that anchors the palette |
| Lime Glow | `#e6ff55` | `--color-lime-glow` | Green action color for filled buttons, selected navigation states, and focused conversion moments. |
| Sage Mist | `#d8e5d6` | `--color-sage-mist` | Section backgrounds, card surfaces, content band alternation — soft botanical green that signals freshness without competing with the food photography |
| Warm Sand | `#e8dcc6` | `--color-warm-sand` | Accent surface for alternate section bands — warm beige that pairs with food photography and adds earthy variety to the green-dominant palette |
| Cream Canvas | `#f4f3e7` | `--color-cream-canvas` | Primary page background, the warm off-white that gives the entire system its organic, non-clinical feel |
| Forest Shadow | `#0e150e` | `--color-forest-shadow` | Primary text color, borders, input strokes — near-black with a barely-perceptible green undertone that harmonizes with the brand greens |
| Pure Ink | `#000000` | `--color-pure-ink` | Maximum-contrast text, hairlines, icon strokes — used where absolute sharpness is needed |
| Warm Gray | `#8c8c82` | `--color-warm-gray` | Medium-contrast borders, control outlines, and structural separators. Do not promote it to the primary CTA color |
| Slate Gray | `#555555` | `--color-slate-gray` | Secondary text in disabled or low-emphasis button contexts |

## Tokens — Typography (Google Fonts Integration)

### Plus Jakarta Sans (Display / Headings) — Display headlines, hero text, large category labels — used at extreme sizes (70–80px) with tight leading (0.85) that lets letterforms nearly touch; weight 400 at this size is the signature choice, creating a calm authority that doesn't shout · `--font-display`

- **Google Font:** Plus Jakarta Sans  
- **Weights:** 400, 700  
- **Sizes:** 40px, 70px, 80px  
- **Line height:** 0.85–1.00  
- **Role:** Display headlines, hero text, large category labels

### Plus Jakarta Sans (Secondary Accent) — Secondary display accent — ultra-thin weight (200) with extreme negative tracking creates a delicate, editorial counterpoint to the geometric Plus Jakarta Sans display · `--font-accent`

- **Google Font:** Plus Jakarta Sans  
- **Weights:** 200  
- **Sizes:** 48px  
- **Line height:** 1.00  
- **Letter spacing:** -0.047em  
- **Role:** Secondary display accent — ultra-thin editorial counterpoint

### Plus Jakarta Sans (Body & UI) — Body text, navigation, button labels, card descriptions, footers — positive tracking (0.01–0.05em) improves readability at small sizes; weight 700 for labels and CTAs, 400 for body · `--font-sans`

- **Google Font:** Plus Jakarta Sans  
- **Weights:** 400, 700  
- **Sizes:** 12px, 14px, 16px, 18px, 20px, 24px  
- **Line height:** 1.20–1.38  
- **Letter spacing:** 0.01em at 12–14px, 0.017em at 16px, 0.03em at 20px, 0.05em at 24px  
- **Role:** Body text, navigation, button labels, card descriptions, footers

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| caption | Plus Jakarta Sans | 400 | 12px | 1.33 | 0.2px | `--text-caption` |
| body-sm | Plus Jakarta Sans | 400 | 14px | 1.29 | 0.24px | `--text-body-sm` |
| body | Plus Jakarta Sans | 400 | 16px | 1.25 | 0.27px | `--text-body` |
| body-lg | Plus Jakarta Sans | 400 | 18px | 1.33 | 0.54px | `--text-body-lg` |
| subheading | Plus Jakarta Sans | 700 | 20px | 1.2 | 0.6px | `--text-subheading` |
| heading-sm | Plus Jakarta Sans | 700 | 24px | 1.21 | 1.2px | `--text-heading-sm` |
| heading | Plus Jakarta Sans | 400 | 40px | 0.85 | 0px | `--text-heading` |
| heading-lg | Plus Jakarta Sans | 200 | 48px | 1 | -2.26px | `--text-heading-lg` |
| display | Plus Jakarta Sans | 400 | 70px | 0.85 | 0px | `--text-display` |
| display-lg | Plus Jakarta Sans | 400 | 80px | 1 | 0px | `--text-display-lg` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
| :---- | :---- | :---- |
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 40 | 40px | `--spacing-40` |
| 60 | 60px | `--spacing-60` |

### Border Radius

| Element | Value |
| :---- | :---- |
| cards | 24px |
| small | 4px |
| badges | 20px |
| images | 20px |
| inputs | 8px |
| buttons | 9999px |

### Shadows

| Name | Value | Token |
| :---- | :---- | :---- |
| xl | `rgba(14, 21, 14, 0.4) 3px 3px 32px -10px` | `--shadow-xl` |

### Layout

- **Page max-width:** 1200px  
- **Section gap:** 80px  
- **Card padding:** 24px  
- **Element gap:** 8px

## Components

### Pill CTA Button (Lime Fill)

**Role:** Primary action button — used for 'Order Now', 'Add to Bag', and any conversion action

Fully rounded (9999px) pill shape, #e6ff55 background, #0e150 text in Plus Jakarta Sans weight 700 at 16–18px with 0.017em tracking, padding 16px 24px. The lime fill against the cream canvas creates the highest-contrast functional element on any page.

### Pill Outline Button (Forest Border)

**Role:** Secondary or navigation action — used for nav 'ORDER' pill, secondary CTAs

Fully rounded (9999px) pill, transparent or cream fill, 2px #00473c border, #00473c text in Plus Jakarta Sans weight 700 at 16px, padding 12px 20px. Outlined rather than filled to maintain a lighter visual weight than the primary CTA.

### Ghost Text Link

**Role:** Inline action link — used for 'Order now →' on product cards, footer links, inline CTAs

No background, no border, #0e150 text in Plus Jakarta Sans weight 700 at 16px, right-arrow glyph appended. Underline on hover only. The arrow is the visual anchor.

### Navigation Bar

**Role:** Top-level site navigation — persistent across all pages

Horizontal bar on #f4f3e7 background, centered logo 'listobox' in #00473c at 24–28px Plus Jakarta Sans weight 700, nav items flanking in Plus Jakarta Sans weight 700 at 14px with 0.05em tracking, all-caps. Right-side 'ORDER' item rendered as a Pill Outline Button in #00473c.

### Menu Category Tab

**Role:** Section filter for menu browsing — 'Salads', 'Warm Bowls', 'Sides'

Large text-only tab, no border, no background change between states. Active tab: #0e150 in Plus Jakarta Sans at 40px weight 400 with a small dot indicator beneath. Inactive: #0e150 at 40px with no indicator. The typographic scale itself is the navigation signal.

### Product Card

**Role:** Menu item display — one card per food item in the browsing grid

Top: square food photograph with 20px border-radius. Below image: 24px padding, product name in Plus Jakarta Sans weight 700 at 20px #0e150, 8px gap, description in Plus Jakarta Sans weight 400 at 16px #0e150 with 1.25 line-height, 16px gap, 'Order now →' Ghost Text Link. No card background, no border, no shadow — the photograph IS the card surface.

### Online Only Badge

**Role:** Availability indicator on exclusive digital products

Absolute-positioned top-left of product card, #e6ff55 background, #0e150 text in Plus Jakarta Sans weight 700 at 12px all-caps with 0.05em tracking, padding 4px 12px, 20px border-radius. Small, bright, unmissable.

### Full-Bleed Hero with Text Overlay

**Role:** Landing page hero — single product or campaign feature

Full-viewport-width photograph (no border-radius) as the background layer. Semi-transparent text overlay panel in cream (#f4f3e7 at ~90% opacity) anchored bottom-left, 40px padding, containing: small-caps eyebrow text in Plus Jakarta Sans weight 700 at 14px, 8px gap, product name in Plus Jakarta Sans at 70–80px weight 400 line-height 0.85, 24px gap, Pill CTA Button (Lime Fill).

### Split Content Section

**Role:** Feature/editorial content — catering, about, mission sections

Two-column layout on a Sage Mist or Warm Sand section background. Left column: text stack with large display headline in Plus Jakarta Sans at 48–70px weight 400, 24px gap, structured sub-sections with bolded labels in Plus Jakarta Sans weight 700 at 18px and body text in weight 400 at 16px. Right column: single full-bleed photograph with 20px border-radius. Generous 80–120px vertical padding.

### Eyebrow Label

**Role:** Pre-headline context label — 'SUNSHINE IN A SALAD', section identifiers

All-caps, Plus Jakarta Sans weight 700 at 14px, 0.05em tracking, #0e150 or #00473c. Positioned 16–24px above the headline it qualifies. Functions as a typographic subtitle that adds context without visual weight.

### Food Photograph (Standard)

**Role:** Product and editorial photography

Overhead or 3/4 angle shots, high saturation, warm natural lighting. Rounded corners at 20px. No overlays, no text burned in. Full-bleed within their container — the food is the entire visual.

## Do's and Don'ts

### Do

- Use Plus Jakarta Sans at 70–80px weight 400 with 0.85 line-height for all primary display headlines — the weight-to-size ratio is the brand voice  
- Default to #f4f3e7 as the page background; use #d8e5d6 or #e8dcc6 for alternating full-width content bands only  
- Use #e6ff55 fill + #0e150 text exclusively for the primary action button — never invert the relationship  
- Render all buttons as fully rounded pills (9999px radius) with 16px 24px padding and Plus Jakarta Sans weight 700 at 16px  
- Let food photography fill its container edge-to-edge with 20px border-radius — no frames, no borders, no overlays around images  
- Use 'Order now →' as a Ghost Text Link (no background, arrow glyph) for all secondary product actions  
- Apply positive letter-spacing (0.01–0.05em) to all text below 24px in Plus Jakarta Sans for legibility

### Don't

- Don't use multiple accent colors — the palette is intentionally restricted to one lime (#e6ff55) and one forest green (#00473c) for action and brand respectively  
- Don't set headlines in weight 700 or above — the brand's authority comes from the calm confidence of 400 at large sizes  
- Don't add card backgrounds, borders, or drop shadows to product cards — the photograph is the card  
- Don't use the lime (#e6ff55) for anything other than primary CTA fills and availability badges  
- Don't use line-height above 1.0 for display type — the tight leading is what makes the headlines feel monumental  
- Don't render buttons as rectangles, capsules, or with subtle radii — pill (9999px) is the only button shape  
- Don't apply gradients — the system is entirely flat color, with warmth coming from the cream canvas and saturated photography

## Surfaces

| Level | Name | Value | Purpose |
| :---- | :---- | :---- | :---- |
| 0 | Cream Canvas | `#f4f3e7` | Base page background — warm off-white that reads as organic rather than clinical |
| 1 | Sage Mist Band | `#d8e5d6` | Full-width content sections alternating with the canvas — calm botanical background for text-forward or split-layout content |
| 2 | Warm Sand Band | `#e8dcc6` | Alternate section background — earthy warm tone for visual rhythm variation |
| 3 | Lime Glow Highlight | `#e6ff55` | Accent surface for badges and CTA fills — the only chromatic surface that draws functional attention |
| 4 | Deep Forest Surface | `#00473c` | Dark accent surface for nav pills, dark-mode content blocks, or reversed text sections |

## Quick Start Configuration

### Next.js Font Setup (`app/fonts.ts`)

```typescript
import { Plus_Jakarta_Sans } from 'next/font/google';

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const plusJakartaAccent = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200'],
  style: ['normal', 'italic'],
  variable: '--font-accent',
  display: 'swap',
});
```

### Tailwind v4 (`globals.css`)

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-deep-forest: #00473c;
  --color-lime-glow: #e6ff55;
  --color-sage-mist: #d8e5d6;
  --color-warm-sand: #e8dcc6;
  --color-cream-canvas: #f4f3e7;
  --color-forest-shadow: #0e150e;
  --color-pure-ink: #000000;
  --color-warm-gray: #8c8c82;
  --color-slate-gray: #555555;

  /* Typography */
  --font-display: var(--font-sans), 'Plus Jakarta Sans', sans-serif;
  --font-accent: var(--font-accent), 'Plus Jakarta Sans', sans-serif;
  --font-sans: var(--font-sans), 'Plus Jakarta Sans', sans-serif;

  /* Typography — Scale */
  --text-caption: 12px;
  --leading-caption: 1.33;
  --tracking-caption: 0.2px;

  --text-body-sm: 14px;
  --leading-body-sm: 1.29;
  --tracking-body-sm: 0.24px;

  --text-body: 16px;
  --leading-body: 1.25;
  --tracking-body: 0.27px;

  --text-body-lg: 18px;
  --leading-body-lg: 1.33;
  --tracking-body-lg: 0.54px;

  --text-subheading: 20px;
  --leading-subheading: 1.2;
  --tracking-subheading: 0.6px;

  --text-heading-sm: 24px;
  --leading-heading-sm: 1.21;
  --tracking-heading-sm: 1.2px;

  --text-heading: 40px;
  --leading-heading: 0.85;
  --tracking-heading: 0px;

  --text-heading-lg: 48px;
  --leading-heading-lg: 1;
  --tracking-heading-lg: -2.26px;

  --text-display: 70px;
  --leading-display: 0.85;
  --tracking-display: 0px;

  --text-display-lg: 80px;
  --leading-display-lg: 1;
  --tracking-display-lg: 0px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-40: 40px;
  --spacing-60: 60px;

  /* Border Radius */
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-lg-2: 11px;
  --radius-2xl: 20px;
  --radius-3xl: 24px;
  --radius-full: 1000px;

  /* Shadows */
  --shadow-xl: rgba(14, 21, 14, 0.4) 3px 3px 32px -10px;
}
```