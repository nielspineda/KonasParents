# Niels & Bess — Wedding Website - KonasParents

A simple, elegant wedding website built with Next.js (App Router) + Tailwind CSS, hosted on GitHub Pages.

## Live Site

`https://nielspineda.github.io/KonasParents/`

## Routes

| Path | Description |
|------|-------------|
| `/` | Public landing page with scrollytelling relationship timeline |
| `/details` | Wedding details (itinerary, RSVP, FAQs, Photos) — password-protected |

---

## Setup

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The password gate requires `NEXT_PUBLIC_KP_PASSWORD` to be set. See **Password Setup** below.

---

## Password Setup

The `/details` page is protected by a soft password gate.

The password is **never stored in plain text** in the repository. Instead:

1. The password is stored as a GitHub Actions secret named `KP_PASSWORD`.
2. At build time, it is injected as `NEXT_PUBLIC_KP_PASSWORD` (a SHA-256 hash).
3. In the browser, the user's input is hashed with SHA-256 and compared to the stored hash.

### Setting the password

1. Go to your repository → **Settings → Secrets and variables → Actions**.
2. Create a new secret: `KP_PASSWORD`.
3. Set the value to the **SHA-256 hash** of your desired password.

**To generate a SHA-256 hash of your password:**

```bash
echo -n "yourpassword" | sha256sum
```

Or use an online tool like [emn178.github.io/online-tools/sha256.html](https://emn178.github.io/online-tools/sha256.html).

> ⚠️ This is a **soft gate only** — it is a deterrent, not real security. The hash is publicly visible in the built JavaScript bundle.

### Local development with password

Create a `.env.local` file:

```bash
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_KP_PASSWORD=<sha256-hash-of-your-password>
```

---

## Content Editing

All content lives in the `/content` folder.

### Timeline (`/content/timeline.json`)

Each entry has:
- `id` — unique string
- `date` — display date (e.g., "Summer 2018")
- `title` — card heading
- `story` — paragraph text
- `images` — array of image paths (relative to `/public`)
- `isFuture` (optional) — styles the card differently (for the "Married!" entry)

### Itinerary (`/content/itinerary.json`)

Each entry has:
- `time` — display time (e.g., "4:30 PM")
- `event` — event name
- `description` — short description

### FAQs (`/content/faqs.json`)

Each entry has:
- `question`
- `answer`

---

## Images

Place images in `/public/images/`:

| Path | Usage |
|------|-------|
| `/public/images/hero.jpg` | Hero image on the Details page |
| `/public/images/timeline/` | Timeline card images |
| `/public/images/gallery/` | Photos tab gallery images |

After adding images, update the relevant JSON files or component code (see TODO comments).

### Hero image

In `app/details/page.tsx`, find the `TODO` comment and replace the gradient background with your hero image:

```tsx
<img
  src={`${BASE_PATH}/images/hero.jpg`}
  alt="Niels and Bess"
  className="absolute inset-0 w-full h-full object-cover"
/>
```

### Gallery images

In `app/details/page.tsx`, update the `galleryImages` array:

```tsx
const galleryImages = [
  { src: `${BASE_PATH}/images/gallery/photo1.jpg`, alt: "Description" },
  { src: `${BASE_PATH}/images/gallery/photo2.jpg`, alt: "Description" },
  // ...
];
```

### RSVP Form

In `app/details/page.tsx`, replace `RSVP_URL` with your Google Form URL:

```tsx
const RSVP_URL = "https://forms.gle/yourFormId";
```

---

## Deployment

Deployment is automatic via GitHub Actions when you push to `main`.

### Manual deployment

1. Set `KP_PASSWORD` secret in GitHub (see Password Setup).
2. Enable GitHub Pages in repository settings:
   - Source: **GitHub Actions**
3. Push to `main`.

The workflow will build the site and deploy the `out/` directory to GitHub Pages.

---

## Development Notes

- Static export (`output: "export"`) — no server-side features.
- `basePath` and `assetPrefix` are set via `NEXT_PUBLIC_BASE_PATH` env var.
- Password gate uses SHA-256 via the Web Crypto API (no external libs).
- Fonts: Cormorant Garamond (serif headings) + Lato (body).
