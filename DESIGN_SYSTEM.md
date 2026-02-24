# Design System

A living reference for the visual language of this wedding website. Use this document to maintain consistency across all pages and components.

---

## Color Palette

### Core Colors

| Token                  | Value                        | Usage                                      |
| ---------------------- | ---------------------------- | ------------------------------------------ |
| `--background`         | `#F4EFE8`                    | Page background — warm linen/parchment     |
| `--foreground`         | `#3A342F`                    | Primary text — rich warm brown              |
| `--foreground-secondary` | `#6F6760`                  | Secondary/muted text                       |
| `--accent`             | `#A8B5A2`                    | Sage green — buttons, links, accents       |
| `--accent-hover`       | `#8F9A86`                    | Sage green hover state                     |
| `--card-bg`            | `rgba(246, 243, 238, 0.8)`   | Card/surface background — semi-transparent |
| `--card-border`        | `#E5DED6`                    | Card borders — warm stone                  |

### Extended Palette (Gradient & Decorative)

Used in the horizontal banner gradient, transitioning from warm neutrals into sage greens:

```
#E5DED6 → #ddd0c2 → #d4c4b0 → #cbb89e → #C2C9BE → #B5BDB0 → #A8B5A2 → #9BAD94
```

### Color Principles

- **Warm over cool.** Every surface leans warm — creams, linens, and tans. Avoid pure whites or cool grays.
- **Green as accent, not dominant.** Sage green (`--accent`) highlights interactive elements and headings but never overwhelms. The overall feel is earthy neutral with green touches.
- **Transparency for depth.** Cards use semi-transparent backgrounds to let the linen texture breathe through.

---

## Typography

### Font Families

| Token          | Stack                                   | Role                              |
| -------------- | --------------------------------------- | --------------------------------- |
| `--font-serif` | `"Cormorant Garamond", Georgia, serif`  | Mid-level headings, dates          |
| `--font-sans`  | `"Lato", system-ui, sans-serif`         | Body text, UI labels, navigation   |
| `--font-script`| `"Nothing You Could Do", cursive`       | Display headings, decorative text  |

**Weights loaded:**

- Cormorant Garamond: 300 (light), 400 (regular), 600 (semi-bold), plus italic variants
- Lato: 300 (light), 400 (regular), 700 (bold)
- Nothing You Could Do: 400 (regular)

### Typographic Style

The style guide establishes two distinct text voices that work together:

1. **Handwritten / Script** — For decorative headers ("wedding weekend", "itinerary", "Save the date!!"). In the codebase this maps to `--font-script` (Nothing You Could Do) at large sizes. The fine-point pen style creates warmth and personality.

2. **Structured / Clean** — For body text, labels, and UI elements. In the codebase this maps to `--font-sans` (Lato) with generous letter-spacing for a clean, readable feel.

3. **Serif / Elegant** — For mid-level headings and dates where a more refined look is needed. Maps to `--font-serif` (Cormorant Garamond).

### Text Treatments

| Treatment         | Implementation                                                     | Example                 |
| ----------------- | ------------------------------------------------------------------ | ----------------------- |
| Page title        | `--font-script`, `text-6xl`–`text-8xl`                         | "Bess & Niels"          |
| Section heading   | `--font-script`, `text-4xl`–`text-5xl`                         | "The Day"               |
| Event category    | `--font-sans`, uppercase, `tracking-[0.2em]`–`tracking-[0.3em]`   | WELCOME, CEREMONY       |
| Day label         | `--font-sans`, lowercase, `tracking-wide`, `text-sm`               | friday, saturday        |
| Body text         | `--font-sans`, `text-sm`–`text-base`, regular weight               | "Drinks & Desserts"     |
| Date / subtitle   | `--font-serif`, uppercase, `tracking-[0.25em]`, muted color        | NOV 6-7, 2026           |

### Spacing & Tracking

- **Uppercase labels** always pair with wide letter-spacing (`tracking-[0.2em]` to `tracking-[0.3em]`).
- **Body text** uses default or `tracking-wide` — never tight.
- Generous whitespace between sections; the design breathes.

---

## Layout & Spacing

### Principles

- **Asymmetric, organic layouts.** Elements are not rigidly centered or grid-locked. Cards and photos feel casually placed, as if arranged on a table.
- **Generous vertical rhythm.** Sections have ample padding (`py-24` for major sections). Content never feels cramped.
- **Horizontal padding** scales with viewport: `px-4` on mobile, `px-6`–`px-8` on larger screens.

### Common Spacing Values

| Context              | Value             |
| -------------------- | ----------------- |
| Section padding      | `py-24`           |
| Content gaps         | `gap-3`, `gap-4`  |
| Element margins      | `mb-4`–`mb-10`    |
| Inline padding       | `px-4`–`px-8`     |
| Button padding       | `px-6 py-1.5`–`px-8 py-3` |

---

## UI Components

### Cards

- Background: `--card-bg` (semi-transparent cream)
- Border: `--card-border` with `rounded-2xl`
- Shadow: soft, diffused — `shadow-[0_8px_30px_rgba(0,0,0,0.08)]`
- The style guide shows a **paper/notecard** aesthetic — cards should feel like physical stationery, not digital panels

### Paperclip Decoration

The style guide features a paperclip graphic clipped to the top of the itinerary card. Decorative touches like this reinforce the handcrafted, tactile feel.

### Polaroid Photo Frame

Photos are presented in a **polaroid-style frame** with:

- Slightly off-white border (thicker on the bottom for caption space)
- Subtle aged/worn edges
- Optional handwritten-style caption text below the image
- Slight rotation or casual placement to feel organic

### Buttons

- Background: `--accent` (sage green)
- Text: white or `--background`
- Border radius: `rounded-full` for primary actions, `rounded-lg` for secondary
- Hover: `--accent-hover` with smooth transition
- Letter-spacing: slightly tracked uppercase text

### Transitions & Motion

- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — smooth, organic feel
- Duration: 300ms for micro-interactions, up to 1.2s for entrance animations
- Motion should feel gentle and unhurried, matching the relaxed wedding tone

---

## Imagery

### Photography Style

Based on the engagement photos in the style guide:

- **Natural, candid moments** — not overly posed or studio-lit
- **Warm color grading** — golden tones, slightly desaturated
- **Outdoor settings** — natural light, greenery, landscapes
- **Intimate framing** — close, personal, emotionally warm

### Image Presentation

- Use polaroid-style frames for featured photos
- Photos can be slightly rotated (1–3°) for a casual, pinned-to-a-board feel
- Avoid hard crops or clinical framing; let images feel organic

---

## Tone & Voice

The design language communicates:

- **Casual elegance** — refined but never stuffy
- **Warmth & intimacy** — this is a personal celebration, not a corporate event
- **Handcrafted feel** — script fonts, paper textures, and tactile elements suggest something made with care
- **Relaxed confidence** — lowercase day names ("friday", "saturday"), minimal punctuation, unhurried pacing

### Copy Guidelines

- Use lowercase for informal labels (day names, casual headers)
- Use uppercase + tracking for structured categories (event names)
- Keep copy brief and warm — conversational, not formal
- Pipe separators (`|`) for inline details (e.g., "Vows | 4pm-4:30pm")

---

## Gradient Banner

The horizontal gradient banner transitions from warm neutrals to sage greens, creating a visual bridge between the linen background and the green accent color. It uses a background overlay at 75% opacity (`#F4EFE8cc`) to keep the gradient subtle.

---

## Quick Reference

```css
:root {
  --background: #F4EFE8;
  --foreground: #3A342F;
  --foreground-secondary: #6F6760;
  --accent: #A8B5A2;
  --accent-hover: #8F9A86;
  --card-bg: rgba(246, 243, 238, 0.8);
  --card-border: #E5DED6;
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Lato", system-ui, sans-serif;
  --font-script: "Nothing You Could Do", cursive;
}
```
