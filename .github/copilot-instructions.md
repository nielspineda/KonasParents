# Copilot Instructions

This is a wedding website for Niels & Bess. Every change must follow the established design system. Read `DESIGN_SYSTEM.md` at the repository root for full details before making any visual or styling decisions.

## Strict Rules

### Colors — Use CSS Variables Only

Never hard-code new color values. Use the existing CSS custom properties defined in `app/globals.css`:

- `--background` (#F4EFE8) — warm linen page background
- `--foreground` (#3A342F) — primary text, rich warm brown
- `--foreground-secondary` (#6F6760) — muted/secondary text
- `--accent` (#A8B5A2) — sage green for buttons, links, interactive elements
- `--accent-hover` (#8F9A86) — sage green hover state
- `--card-bg` — semi-transparent cream for card surfaces
- `--card-border` (#E5DED6) — warm stone for borders

If referencing colors in Tailwind classes, use the exact hex values above (e.g., `text-[#3A342F]`, `bg-[#A8B5A2]`). Do not introduce new colors like blue, red, purple, or cool grays. The palette is strictly warm neutrals + sage green.

### Typography — Three Font Families

Apply fonts via inline `style={{ fontFamily: "var(--font-...)" }}`:

1. **`--font-script`** (La Belle Aurore) — Use for display headings, hero titles, section names, and any text meant to feel personal or decorative. Use at large sizes (text-3xl and up). Single weight font (400).
2. **`--font-sans`** (Lato) — Use for body text, UI labels, buttons, navigation, dates, and small uppercase-tracked labels. Use weight 300 for body, 400–700 for UI.
3. **`--font-serif`** (Cormorant Garamond) — Use for mid-level headings, elegant date displays, or italic body text in timeline cards where a softer, more personal tone is needed.

Never use system fonts, never add new Google Fonts without explicit approval.

### Text Treatments

- **Uppercase labels**: Always pair with letter-spacing (`tracking-[0.2em]` to `tracking-[0.3em]`) and `--font-sans`
- **Day names and casual labels**: Use lowercase (e.g., "friday" not "Friday")
- **Section headings**: Use `--font-script` with semi-bold or bold weight
- **Body text**: Use `--font-sans` with weight 300, `text-sm` or `text-base`

### Component Patterns

- **Cards**: Use the `.paper-card` class for any card or content container. Cards should feel like physical stationery, not flat digital panels.
- **Photos**: Use the `.polaroid` class for image frames. Apply slight rotation (`rotate(1deg)` or `rotate(-1deg)`) for an organic feel.
- **Dividers**: Use the `.divider-leaf` class for decorative section separators.
- **Buttons**: Primary buttons use `bg-[#A8B5A2]` with `rounded-full`, white text, and `tracking-wide`. Secondary buttons use bordered style with `rounded-full`.
- **Tabs**: Use pill-style rounded buttons, not underline tabs.

### Aesthetic Principles

- **Warm over cool**: Every surface leans warm — creams, linens, tans. Never use pure white (#fff) as a background, cool grays, or blue-tinted colors.
- **Handcrafted feel**: The site should feel like a handmade invitation, not a corporate landing page. Use script fonts, paper textures, polaroid frames, and organic layouts.
- **Generous whitespace**: Sections use ample padding (`py-20` to `py-24`). Content never feels cramped.
- **Gentle motion**: Transitions use `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Animations are slow and relaxed (300ms–1.2s). Nothing should feel snappy or aggressive.
- **Green as accent only**: Sage green highlights interactive elements but never dominates. The overall feel is earthy neutral with green touches.

### Tech Stack

- Next.js with static export (`output: "export"`)
- TypeScript
- Tailwind CSS (v4, imported via `@import "tailwindcss"`)
- Fonts loaded from Google Fonts in `app/layout.tsx`
- No additional CSS frameworks or UI libraries

### What Not to Do

- Do not add shadows darker than `rgba(0,0,0,0.1)`
- Do not use border-radius smaller than `rounded-lg` on cards
- Do not use font weights heavier than 700
- Do not introduce animations with durations under 200ms
- Do not use alert/error colors like bright red — use muted, warm tones instead
- Do not remove the password gate on the details page
