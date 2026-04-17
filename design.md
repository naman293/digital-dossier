# Digital Dossier — Design System

A complete reference for building interfaces in the **Neo-Technical Dossier** aesthetic.  
Copy this document to bootstrap any project with the same visual language.

---

## Philosophy

> Evoke a high-security digital file or sophisticated terminal interface.

Three principles drive every decision:

| Principle | Implementation |
|---|---|
| **Monospace Dominance** | JetBrains Mono for all labels, metadata, and UI chrome |
| **Deep Contrast** | Near-black obsidian background against high-saturation crimson accents |
| **Micro-Detailing** | Corner brackets, circuit lines, pulsing dots — complexity through small details |

---

## Color Tokens (OKLCH)

All colors use the [OKLCH color space](https://oklch.com) for perceptual uniformity.

```css
:root {
  /* Backgrounds */
  --background:      oklch(0.13 0.005 260);  /* Deep obsidian */
  --surface:         oklch(0.16 0.005 260);  /* Panel surface */
  --surface-raised:  oklch(0.19 0.005 260);  /* Hover/elevated */
  --grid-line:       oklch(0.22 0.005 260);  /* Structural guides */

  /* Text */
  --foreground:      oklch(0.94 0.008 80);   /* Primary — near white, warm */
  --muted-foreground:oklch(0.75 0.01 260);   /* Body copy, descriptions */
  --label:           oklch(0.65 0.01 260);   /* Metadata keys, system labels */

  /* Accent — Crimson */
  --crimson:         oklch(0.50 0.18 18);    /* Primary action / highlight */
  --crimson-dim:     oklch(0.38 0.13 18);    /* Borders, secondary accents */
  --crimson-glow:    oklch(0.55 0.22 18);    /* Glow effects */

  /* Borders */
  --border:          oklch(0.28 0.006 260);  /* Panel borders */
  --input:           oklch(0.22 0.005 260);  /* Input field background */
}
```

### Color Usage Rules
- **Never use `opacity` on foreground text** — use an explicit lower-lightness OKLCH value instead.
- The crimson family should appear sparingly: 1–2 places per section maximum.
- Borders should be visible but never compete with content.

---

## Typography

```css
--font-display: 'JetBrains Mono', monospace;   /* Headings, names, titles */
--font-mono:    'JetBrains Mono', monospace;   /* All UI chrome, labels, code */
--font-body:    'Inter', system-ui, sans-serif;/* Long-form readable content */
```

### Scale

| Role | Class | Size | Weight |
|---|---|---|---|
| Hero title | `font-display text-6xl font-bold` | 60px | 700 |
| Section heading | `font-display text-xl font-semibold tracking-wider` | 20px | 600 |
| Card title | `font-display text-base font-semibold` | 16px | 600 |
| Body copy | `font-body text-sm leading-relaxed` | 14px | 400 |
| Terminal label | `.terminal-label` | 10px | 400 |
| Metadata key | `.terminal-label tracking-wider` | 10px | 400 |

### Terminal Label

```css
.terminal-label {
  font-family: var(--font-mono);
  font-size: 0.625rem;       /* 10px */
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--label);       /* oklch(0.65 0.01 260) */
}
```

---

## Spacing & Layout

- **Max content width**: `max-w-6xl` (72rem / 1152px)
- **Section padding**: `py-24 px-6`
- **Grid gap**: `gap-8` to `gap-12`
- **Panel padding**: `p-4` (compact) / `p-6` (standard)

### Grid Patterns
```
Hero:       1fr  360px   (content + portrait)
Projects:   repeat(auto-fill, minmax(300px, 1fr))
About:      1fr  1fr
Skills:     repeat(auto-fill, minmax(200px, 1fr))
```

---

## Signature UI Components

### 1. Dossier Panel

A bordered container with crimson L-bracket corners that evoke a physical file/document.

```css
.dossier-panel {
  border: 1px solid var(--border);
  background: var(--surface);
  position: relative;
  isolation: isolate;   /* keeps pseudo-elements from overlapping siblings */
}

/* Top-left L-bracket */
.dossier-panel::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px;
  width: 10px; height: 10px;
  border-top: 1px solid var(--crimson-dim);
  border-left: 1px solid var(--crimson-dim);
  pointer-events: none;
  z-index: 1;
}

/* Bottom-right L-bracket */
.dossier-panel::after {
  content: '';
  position: absolute;
  bottom: -1px; right: -1px;
  width: 10px; height: 10px;
  border-bottom: 1px solid var(--crimson-dim);
  border-right: 1px solid var(--crimson-dim);
  pointer-events: none;
  z-index: 1;
}
```

**Usage in JSX:**
```tsx
<div className="dossier-panel p-6">
  <div className="terminal-label mb-3">SECTION LABEL</div>
  {/* content */}
</div>
```

---

### 2. Scanline Overlay

A `position: fixed` repeating gradient that adds CRT texture across the entire viewport.

```css
.scanline-overlay {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 50;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    oklch(0 0 0 / 2.5%) 2px,
    oklch(0 0 0 / 2.5%) 4px
  );
}
```

```tsx
{/* Place as FIRST child of root layout */}
<div className="scanline-overlay" />
```

---

### 3. Data Strip

A 2px gradient line used as a structural separator inside sections.

```css
.data-strip {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--crimson-dim) 20%,
    var(--crimson) 50%,
    var(--crimson-dim) 80%,
    transparent 100%
  );
}
```

```tsx
<motion.div
  initial={{ scaleX: 0 }}
  animate={{ scaleX: 1 }}
  transition={{ duration: 1 }}
  className="data-strip mb-8 origin-left"
/>
```

---

### 4. Telemetry Strip (Section Divider)

An animated waveform SVG that separates content sections. **Critical rules:**

- All SVG path `y` values must stay in `8–32` range inside a `viewBox="0 0 1280 40"`.
- Container must have `overflow: hidden` to prevent glow bleed.
- Use unique IDs per instance for SVG `<defs>` filters/gradients.
- Glow filter must have `x="0%" y="0%" width="100%" height="100%"` — no overflow.

```tsx
<div style={{ height: '48px', overflow: 'hidden', background: 'var(--background)' }}>
  <svg viewBox="0 0 1280 40" preserveAspectRatio="none" width="100%" height="48">
    <defs>
      <linearGradient id="tgr" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="oklch(0.50 0.18 18)" stopOpacity="0" />
        <stop offset="50%"  stopColor="oklch(0.55 0.22 18)" stopOpacity="1" />
        <stop offset="100%" stopColor="oklch(0.50 0.18 18)" stopOpacity="0" />
      </linearGradient>
      {/* Filter clamped — no vertical overflow */}
      <filter id="tgl" x="0%" y="0%" width="100%" height="100%">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <path d="M0,20 C20,10 40,30 60,20 ..." fill="none"
          stroke="url(#tgr)" strokeWidth="1.5"/>
  </svg>
</div>
```

---

### 5. Status Indicators

```css
/* Pulsing dot */
@keyframes status-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.status-pulse { animation: status-pulse 2s ease-in-out infinite; }

/* Node dot */
.node-dot {
  display: inline-block;
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--crimson-dim);
  flex-shrink: 0;
}
```

```tsx
<span className="node-dot status-pulse"
  style={{ background: 'oklch(0.50 0.18 18)' }} />
```

---

### 6. Circuit Line (Section Header Separator)

```css
.circuit-line {
  background: var(--grid-line);
  height: 1px;
  position: relative;
}
.circuit-line::after {
  content: '';
  position: absolute;
  right: 0; top: -2px;
  width: 5px; height: 5px;
  border: 1px solid var(--crimson-dim);
  border-radius: 50%;
}
```

Section header pattern:
```tsx
<div className="flex items-center gap-4">
  <span className="font-mono text-xs" style={{ color: 'oklch(0.60 0.18 18)' }}>
    [01]
  </span>
  <h2 className="font-display text-xl font-semibold tracking-wider text-foreground">
    SECTION TITLE
  </h2>
  <div className="flex-1 circuit-line" />
</div>
```

---

### 7. Portrait Frame

```css
.portrait-frame {
  position: relative;
  border: 1px solid var(--crimson-dim);
  overflow: hidden;   /* clips image to frame bounds */
}
/* Outer accent border over the image */
.portrait-frame::before {
  content: '';
  position: absolute;
  inset: -6px;
  border: 1px solid oklch(0.30 0.005 260 / 75%);
  pointer-events: none;
  z-index: 2;
}
```

Image treatment for dossier aesthetic:
```tsx
<img
  style={{ filter: 'grayscale(70%) contrast(1.08) brightness(1.06) sepia(12%)' }}
/>
```

---

## Grid Background

```css
.grid-pattern {
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

Use with low opacity: `<div className="absolute inset-0 grid-pattern opacity-10" />`

---

## Animation Conventions

All animations use **Framer Motion** with these conventions:

| Animation | Values |
|---|---|
| Fade in | `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` |
| Slide up | `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` |
| Slide in from right | `initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}` |
| Scale in | `initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}` |
| Stagger delay | `transition={{ delay: index * 0.1 }}` |
| Path draw | `initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}` |

Use `whileInView` + `viewport={{ once: true }}` for scroll-triggered animations.

---

## Text Readability Rules

> **Never use Tailwind opacity modifiers on body text.** `text-foreground/70` at oklch(0.94) produces oklch ~0.66 at that hue — acceptable for decorative labels only, not content.

| Use case | Correct approach |
|---|---|
| Body paragraphs | `style={{ color: 'oklch(0.84 0.009 80)' }}` |
| Bullet/list items | `style={{ color: 'oklch(0.82 0.009 80)' }}` |
| Metadata values | `style={{ color: 'oklch(0.86 0.009 80)' }}` |
| Org / company names | `style={{ color: 'oklch(0.70 0.01 260)' }}` |
| Decorative labels | `className="terminal-label"` (oklch 0.65) |

---

## Future Enhancement Ideas

- **Dithered page transitions** — noise-based dissolve between routes
- **Audio feedback** — subtle mechanical click on button hover
- **Glitch effects** — rare displacement map filter on hover of dossier titles
- **Biometric motifs** — faint fingerprint/retinal scan in Hero section

---

## Persistent Style Keywords
Lock these keywords as the core identity of the project:
`dark dossier UI`, `technical identity card`, `CRT terminal interface`, `ASCII telemetry`, `signal-conditioning control board`, `industrial panel system`, `classified subject file`, `mono-label typography`, `diagnostic dashboard`, `circuit-routing motifs`, `waveform strips`, `surveillance-console framing`, `engineering schematic minimalism`, `coder-editorial atmosphere`, `high-contrast noir developer portfolio`.
