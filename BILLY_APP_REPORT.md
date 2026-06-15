# Billy — Complete App Content, Layout & Design Report

> **Product:** Billy — AI Financial Brain landing page  
> **Type:** Single-page React marketing + interactive demo app  
> **Live dev URL:** `http://localhost:3000/`  
> **Generated:** June 13, 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Page Scroll Map (Top to Bottom)](#3-page-scroll-map-top-to-bottom)
4. [Design System & Theme](#4-design-system--theme)
5. [Global Layout & Shared Patterns](#5-global-layout--shared-patterns)
6. [Section-by-Section Breakdown](#6-section-by-section-breakdown)
7. [Global State & Data Flow](#7-global-state--data-flow)
8. [Interactions & Animations](#8-interactions--animations)
9. [Assets & External Resources](#9-assets--external-resources)
10. [File Structure Reference](#10-file-structure-reference)

---

## 1. Executive Summary

**Billy** is a fintech landing page for an AI-powered personal finance product branded as *"The Living Ledger."* The app sells the idea that traditional expense trackers only show past spending, while Billy provides **90-day predictive cash flow**, macro-economic simulation, AI chat, gamified daily missions, and tiered pricing.

### What the app does (functionally)

| Capability | Real behavior |
|------------|---------------|
| **Landing / marketing** | Static copy, CTAs, problem/solution narrative |
| **Predictive cash flow demo** | Client-side simulated graph recalculates when sliders/buttons change |
| **AI chat widget** | Rule-based mock responses (not live Gemini API in UI) |
| **Daily missions** | Checkbox missions award points, update progress, trigger toasts |
| **Pricing** | Monthly/yearly toggle + modal on plan selection |
| **Beta signup** | Saves email to `localStorage` under key `billy-beta-registrants` |
| **Notifications** | Floating toast panel for mission points and chat alerts |

### Product positioning (messaging)

- **Tagline:** *"This isn't tracking. This is control."*
- **Audience:** Indian market (₹ currency, Goa trip examples, ₹50/mo pricing)
- **Differentiator:** Forward-looking 90-day cash trajectory vs. backward-looking spreadsheets
- **Tone:** Bold, gamified, premium fintech with goat mascot branding

---

## 2. Tech Stack & Architecture

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 (`npm run dev` → port 3000) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/index.css`) |
| Animation | Motion (`motion/react`) |
| Icons | Lucide React |
| Fonts | Google Fonts: Plus Jakarta Sans (headlines), Manrope (body) |

### Component tree

```
App.tsx
├── Header                    (sticky nav)
├── [Floating Toast]          (AnimatePresence, top-right)
├── main
│   ├── Hero
│   ├── ProblemSection        (OtherSections.tsx)
│   ├── PredictiveCashFlow    (id: brain-section)
│   ├── HowItWorks            (id: how-it-works)
│   ├── DailyMissions         (id: missions-section)
│   ├── Pricing               (id: pricing)
│   ├── GoatMode
│   └── EarlyAccess           (id: beta)
└── Footer
```

### Entry points

- `index.html` → mounts `#root`, title: *"My Google AI Studio App"*
- `src/main.tsx` → renders `<App />` in `StrictMode`
- `metadata.json` → AI Studio metadata: name *Billy*, Gemini API capability flag

---

## 3. Page Scroll Map (Top to Bottom)

Visual order as the user scrolls down the single page:

```
┌─────────────────────────────────────────────────────────────┐
│ ① HEADER (sticky, z-50)                                     │
│    Logo | Nav links | Go Pro Pro | Get Beta Access          │
├─────────────────────────────────────────────────────────────┤
│ ② HERO                                                      │
│    Left: headline + CTAs  |  Right: dashboard preview card  │
├─────────────────────────────────────────────────────────────┤
│ ③ PROBLEM SECTION — "THE CONFLATION"                        │
│    2-col intro + 3 problem cards                            │
├─────────────────────────────────────────────────────────────┤
│ ④ PREDICTIVE CASH FLOW — "THE BRAIN" (#brain-section)       │
│    Bento grid: inputs | chart | chat | alerts | insights    │
├─────────────────────────────────────────────────────────────┤
│ ⑤ HOW IT WORKS (#how-it-works) — dark section               │
│    Connect → Analyze → Act                                  │
├─────────────────────────────────────────────────────────────┤
│ ⑥ DAILY MISSIONS (#missions-section)                        │
│    Left: scorecard widget  |  Right: marketing copy         │
├─────────────────────────────────────────────────────────────┤
│ ⑦ PRICING (#pricing)                                        │
│    Billy Free vs Billy Pro cards                            │
├─────────────────────────────────────────────────────────────┤
│ ⑧ GOAT MODE — coming soon teaser (black + gold)             │
├─────────────────────────────────────────────────────────────┤
│ ⑨ EARLY ACCESS (#beta)                                      │
│    Email signup form in green container                     │
├─────────────────────────────────────────────────────────────┤
│ ⑩ FOOTER                                                    │
│    Brand | legal links | share + settings buttons           │
└─────────────────────────────────────────────────────────────┘

Floating overlay (not in scroll flow):
  • Toast notifications — fixed top-20 right-6, z-150
  • Pricing modal — fixed inset-0, z-200
  • Mission celebration overlay — absolute inside scorecard, z-30
```

### Anchor navigation map

| Nav label | Anchor ID | Section |
|-----------|-----------|---------|
| The Brain | `#brain-section` | Predictive Cash Flow |
| How it Works | `#how-it-works` | HowItWorks |
| Missions | `#missions-section` | DailyMissions |
| Pricing | `#pricing` | Pricing |
| Get Beta Access / Join Free Beta | `#beta` | EarlyAccess |

---

## 4. Design System & Theme

### 4.1 Color palette (Material-inspired tokens)

Defined in `src/index.css` under `@theme`:

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#006b0a` | CTAs, accents, progress bars, links hover |
| `on-primary` | `#d2ffc4` | Text on primary buttons |
| `primary-container` | `#59ee50` | Badges, hero glow, chart line, beta section bg |
| `on-primary-container` | `#005406` | Text on primary-container surfaces |
| `secondary` | `#006a33` | Political event selected state, gamification label |
| `on-secondary` | `#cdffd3` | Text on secondary |
| `secondary-container` | `#86f3a1` | Secondary surfaces |
| `tertiary` | `#00666d` | Global indices, cyan accents |
| `tertiary-container` | `#19edfd` | AI insight card, checkmark circles |
| `background` / `surface` | `#f1f8e9` | Page background (soft mint/cream green) |
| `on-background` / `on-surface` | `#2f2f2f` | Primary body text |
| `on-surface-variant` | `#5b5b5b` | Secondary/muted text |
| `surface-container-lowest` | `#ffffff` | Cards, white panels |
| `surface-container-low` | `#ecf3e4` | Pricing section bg, mission stats |
| `surface-container-high` | `#e2e2e2` | External inputs card |
| `outline` | `#777777` | Borders (subtle, often at 10–20% opacity) |

### 4.2 Dark accent surfaces (used in key cards)

| Surface | Hex | Where |
|---------|-----|-------|
| Deep forest | `#041a05` / `#051a05` | Cash flow chart card, Billy Pro pricing |
| Stone dark | `stone-900` | How It Works section |
| Pure black | `#000000` | GOAT MODE section |
| Gold accent | `#D4AF37` | GOAT MODE typography & trophy |

### 4.3 Typography

| Role | Font | Weight usage |
|------|------|--------------|
| Headlines (`font-headline`) | Plus Jakarta Sans | 800–900 (black/extrabold) |
| Body (`font-body`) | Manrope | 400–700 |
| Monospace accents | System mono | Points, balances, tier labels |

**Typographic patterns:**
- Headlines: `tracking-tighter`, large scale (`text-5xl` → `text-8xl` on hero)
- Emphasis words: `text-primary italic` (e.g. *control*, *money game*, *Billy*)
- Section labels: `text-xs uppercase tracking-widest font-black`
- Currency: `font-mono` with ₹ symbol

### 4.4 Shape & spacing

| Pattern | Value |
|---------|-------|
| Max content width | `max-w-7xl` (1280px) centered |
| Horizontal padding | `px-6` (24px) |
| Section vertical padding | `py-24` to `py-32` |
| Card border radius | `rounded-3xl` (24px) |
| Buttons | `rounded-full` (pill shape) |
| Large section curves | `rounded-t-[3.5rem]`, `rounded-b-[4rem]` |

### 4.5 Effects

- **Glassmorphism:** `backdrop-blur-xl` on header and toasts
- **Glow blobs:** Large blurred circles (`blur-[120px]`) in hero, missions, beta
- **Shadows:** `shadow-xl`, `shadow-2xl`, green glow on progress bar
- **Hover:** `hover:scale-105`, `hover:-translate-y-1`, card border brightening
- **Custom animation:** `.pulse-soft` — 3s opacity pulse for live indicators

### 4.6 Semantic / status colors (Tailwind utilities)

| Color | Meaning |
|-------|---------|
| `emerald` | Success alerts, simulation active |
| `amber` | Warning / deficit threat |
| `red` | Urgent badge, problem card icons |
| `orange` | Streak flame icon |

---

## 5. Global Layout & Shared Patterns

### 5.1 App shell (`App.tsx`)

- **Root:** `min-h-screen bg-surface antialiased`
- **Text selection:** `selection:bg-primary selection:text-on-primary`
- **Z-index layers:**
  - Header: `z-50`
  - Toast: `z-150`
  - Pricing modal: `z-200`

### 5.2 Responsive breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Default (mobile) | Single column, hamburger menu, stacked CTAs |
| `sm` (640px+) | Side-by-side CTAs and form rows |
| `md` (768px+) | Desktop nav visible, bento grid activates, 2–3 column grids |
| `lg` (1024px+) | Hero 2-column, missions 2-column with reorder |

### 5.3 Grid systems used

- **Hero:** `grid-cols-1 lg:grid-cols-2`
- **Brain bento:** `grid-cols-1 md:grid-cols-12` with `col-span-4` / `col-span-8` / `col-span-12`
- **Problem cards:** `md:grid-cols-3`
- **Pricing:** `md:grid-cols-2` centered in `max-w-4xl`
- **Missions:** `lg:grid-cols-2` with `order-1` / `order-2` swap on mobile

---

## 6. Section-by-Section Breakdown

---

### 6.1 Header (`Header.tsx`)

**Position:** Fixed sticky top, full width, above all content.

**Purpose:** Brand identity, in-page navigation, primary conversion CTAs.

#### Content

| Element | Text / Action |
|---------|---------------|
| Logo | Goat icon + **Billy** (links to `#`) |
| Nav | The Brain, How it Works, Missions, Pricing |
| Secondary CTA | **Go Pro Pro** (sparkle icon) → `#pricing` |
| Primary CTA | **Get Beta Access** → `#beta` |

#### Styling

- Background: `bg-stone-50/80 backdrop-blur-xl`
- Border: bottom `border-outline-variant/10`
- Logo hover: icon rotates 12°, text turns primary
- Mobile: hamburger → slide-down drawer with **Billy Pro - ₹50/mo** and **Join Beta Trial**

#### Behavior

- `isOpen` state toggles mobile menu
- Nav links close mobile menu on click

---

### 6.2 Floating Toast Notifications (`App.tsx`)

**Position:** `fixed top-20 right-6`, max-width `max-w-sm`.

**Purpose:** Feedback when missions are completed or AI chat triggers alerts.

#### Content variants

| Type | Colors | Example |
|------|--------|---------|
| `success` | Emerald dark | "Points Earned! ⭐" + mission points |
| `warning` | Amber dark | Budget nudge from chat |
| `info` | Stone dark | General info |

#### Behavior

- Auto-dismiss after **4.5 seconds**
- Manual close via X button
- Enter/exit: Motion slide + scale (`AnimatePresence`)

---

### 6.3 Hero (`Hero.tsx`)

**Position:** First section below header. `pt-12 pb-24`.

**Purpose:** Primary value proposition + visual product preview.

#### Layout

| Column | Position | Content |
|--------|----------|---------|
| Left (z-10) | 50% on desktop | Copy + CTAs |
| Right | 50% on desktop | Preview card + mascot + AI insight bubble |

#### Content — Left

| Element | Copy |
|---------|------|
| Badge | **THE LIVING LEDGER** (sparkle, green pill) |
| H1 | This isn't tracking. This is **control.** |
| Body | Meet Billy, your AI financial brain. We don't just log historic transactions—we map your 90-day cash trajectory, predict market impacts, and help you decide your next financial move. |
| CTA 1 | **Join Free Beta** → `#beta` |
| CTA 2 | **Analyze the Brain** → `#brain-section` |

#### Content — Right

| Element | Copy |
|---------|------|
| Dashboard image | Static preview screenshot |
| Mascot | Animated goat (float + subtle rotate, 6s loop) |
| AI Ledger Insight card | "Hey! Based on subscription outflows, you can claim back ₹37,000 more this quarter by toggling Billy Pro's Auto-Pruning." |

#### Styling

- Decorative blurs: primary-container (right), tertiary-container (left)
- Preview card: white, `rounded-3xl`, `shadow-2xl`, hover rotate + scale
- Insight card: `bg-tertiary-container/95`, cyan/teal, floating animation

#### Animation

- Left block: fade + slide from left (0.8s)
- Right block: fade + slide up + scale (0.9s, 0.15s delay)

---

### 6.4 Problem Section — "THE CONFLATION" (`ProblemSection`)

**Position:** Below hero. Rounded top `rounded-t-[3.5rem]`.

**Purpose:** Agitate pain points of traditional finance apps.

#### Layout

```
┌──────────────────────┬──────────────────────┐
│ Label + Headline     │ Supporting paragraph │
│ (left, lg: 50%)      │ (right, max-w-md)    │
└──────────────────────┴──────────────────────┘
┌──────────┬──────────┬──────────┐
│ Card 1   │ Card 2   │ Card 3   │
└──────────┴──────────┴──────────┘
```

#### Content

**Intro headline:** Tracking is *not control.*

**Intro body:** Traditional AI personal finance platforms are glorified spreadsheets — they show what you *already spent* but fail on what you need to **do next**.

**Problem cards:**

| # | Title | Description | Icon |
|---|-------|-------------|------|
| 1 | Too many apps | 5 banks, 3 credit cards, 10 investment apps — constant confusion | Workflow |
| 2 | Zero clarity | Past expenditures are data, not intelligence — need the "why" | EyeOff |
| 3 | Static & Dead | Historic logs = yesterday; Billy projects next 90 days | Hourglass |

#### Styling

- Section bg: `bg-surface-container-low`
- Label: `text-error` — **THE CONFLATION**
- Cards: white, red-tinted icon boxes, hover lift + shadow

---

### 6.5 Predictive Cash Flow — "THE BRAIN" (`PredictiveCashFlow.tsx`)

**Position:** `id="brain-section"`, `py-24`. Core interactive demo.

**Purpose:** Showcase AI financial brain with live-feeling simulation.

#### Section header (centered)

- Label: **THE BRAIN**
- H2: **Your AI Financial Brain.**

#### Bento grid layout (desktop)

```
┌─────────────────┬──────────────────────────────────┐
│ External Inputs │ Predictive Cash Flow (dark card) │
│   (4 cols)      │           (8 cols)               │
├────────┬────────┬──────────────────────────────────┤
│ AI Chat│ Alerts │ Not Just AI                      │
│ (4)    │ (4)    │ (4)                              │
├────────┴────────┴──────────────────────────────────┤
│ Behavioral Insights (full 12 cols)               │
└──────────────────────────────────────────────────┘
```

---

#### Card A: External Inputs (`#external-inputs-card`)

**Position:** Top-left, 4/12 columns.

**Purpose:** Let users tweak macro variables; drives chart recalculation.

| Control | Type | Range / Options | Default |
|---------|------|-----------------|---------|
| Market Trends | Slider | -40 to +40 | 22 |
| Political Event Horizon | 3 buttons | Stable, Tense Gas, Stimulus | stable |
| Simulated Inflation | Slider | 2% to 15% (step 0.5) | 4.5% |
| Global Indices Strength | 3 buttons | Bear Wave, Consolidating, Hyper Growth | bull |

**Footer note:** "Billy ingests 10k+ daily macro signals..."

**Styling:** `bg-surface-container-high`, Context Engine badge (primary pill), Live Feed pulse icon.

---

#### Card B: Predictive Cash Flow (`#predictive-cashflow-card`)

**Position:** Top-right, 8/12 columns. Min height 500px.

**Purpose:** Visualize 90-day projected balance based on inputs.

**Displayed metrics:**

| Metric | Value source |
|--------|--------------|
| Initial Balance | Fixed ₹1,42,000 |
| Projected Balance (90d) | Last point in calculated graph |
| Projected Growth | % and ₹ delta from start to end |

**Chart:** SVG cubic-bezier line with gradient fill, 10 data points, tooltips on hover, axis labels Day 0/30/60/90.

**Simulation formula (simplified):**
- Start: ₹142,000
- Market trend multiplier: `1 + marketTrend/100`
- Political: tense = 0.93×, election/stimulus = 1.05×
- Global: bear = 0.88×, bull = 1.15×
- Inflation drag: `(inflation - 4) × 600` per step
- Organic drift + sine wave noise

**Footer:** "Algorithm Accuracy Guarantee: 87%" + badge **ML-CASHFLOW ENGINE v4.2**

**Styling:** Dark `#041a05`, matrix texture overlay, neon green `#59ee50` chart line.

---

#### Card C: AI Assistant Chat (`#ai-chat-card`)

**Position:** Bottom row, 4/12 columns.

**Purpose:** Interactive demo chat with keyword-based mock AI.

**Initial message:** "Hey there! 'Can I afford that trip to Goa?' Ask me anything about your cash forecast."

**Suggestion chips:**
- Can I afford Goa next month?
- How to save 10k extra?
- Hedge against high inflation?

**Response logic (keyword matching):**
- *goa/trip/afford* → compares projected surplus vs ₹35,000 trip cost
- *save/10k* → subscription scraper + food delivery tips
- *inflation/hedge* → purchasing power depreciation advice
- Default → generic positive trajectory message

**Styling:** Chat bubbles — user = primary green, Billy = white. Typing indicator = 3 bouncing dots.

---

#### Card D: Smart Alerts (`#smart-alerts-card`)

**Position:** Bottom row, 4/12 columns.

**Purpose:** Show proactive financial warnings.

| Alert | Type | Copy |
|-------|------|------|
| Deficit Threat Warned | Amber/warning | High food delivery leak ₹12,400/month |
| Simulation Active | Emerald/info | Adjust inputs to see recalculations |

**Badge:** "1 Urgent" (red pill). Footer: "Continuous Nudge Engine".

---

#### Card E: Not Just AI

**Position:** Bottom row, 4/12 columns.

**Purpose:** Credibility — ML + research backing.

**Copy:** Proprietary ML cross-evaluates market sentiment + transaction behavior.

**Quote block:** "Informed by peer-reviewed research and elite hedge-fund risk models."

**Styling:** `bg-tertiary-container/15`, cyan border tint.

---

#### Card F: Behavioral Insights (`#behavioral-insights-card`)

**Position:** Full width bottom row, 12/12 columns.

**Purpose:** Habit analysis + optimizer score.

**Copy:** Spending frequency, subscription velocity, recurring billing — avg ₹14,500/month savings for beta users.

**Optimizer Potential ring:** Circular SVG progress, score 50–98% computed from inputs:
- +5 if market > 20%, +6 if inflation < 5%, +8 if bull
- -8 if political tense, -7 if inflation > 10%

---

### 6.6 How It Works (`HowItWorks`)

**Position:** `id="how-it-works"`, dark section with rounded bottom `rounded-b-[4rem]`.

**Purpose:** 3-step onboarding story.

#### Content

| Step | # | Title | Description |
|------|---|-------|-------------|
| 1 | 01 | Connect | Link accounts in 30s, read-only, 256-bit encryption, no login storage |
| 2 | 02 | Analyze | Detect subscription loops and velocity profiles |
| 3 | 03 | Act | Interactive predictive dashboard + saving recommendations |

**Headline:** Simple. Smart. *Billy.*

**Styling:** `bg-stone-900`, oversized ghost step numbers (`text-8xl`, green 10% opacity), green dot bullets.

---

### 6.7 Daily Missions (`DailyMissions.tsx`)

**Position:** `id="missions-section"`, `py-32`.

**Purpose:** Gamification demo — missions, points, streaks, tiers.

#### Layout (desktop)

| Left (order-1) | Right (order-2) |
|----------------|-----------------|
| Interactive scorecard widget | Marketing copy + feature list |

On mobile: copy appears first (`order-1`), scorecard second (`order-2`).

#### Right column content

- Label: **GAMIFICATION ENGINE**
- H2: Level up your *money game.*
- Body: Daily missions, streak multipliers, financial efficiency quotients
- Features (cyan checkmarks):
  - Personalized Daily Missions
  - Streak Protection
  - Tier Rewards → Advanced Predictive Scrapers

#### Left column — Scorecard widget

**Header:**
- Daily Score
- Total Gained: **1320 pts** (dynamic)
- Badge: +N Points Available

**Progress bar:**
- Mission Outlines Completed — starts at 45%, +13.75% per completed mission
- Label inside bar when ≥48%: "MATCHING TARGETS"

**Stats row (3 boxes):**

| Stat | Default | Dynamic |
|------|---------|---------|
| Day Streak | 14 | +1 when all 4 missions done |
| Tier Group | Bronze → Silver → Gold → Titan | Based on progress % |
| Missions | 0/4 | Completed count |

**Missions list:**

| ID | Title | Points |
|----|-------|--------|
| m1 | Connect Secondary Bank Wallet | 15 |
| m2 | Trigger predicted cashflow test | 10 |
| m3 | Ask AI Chat a custom Goa budget question | 12 |
| m4 | Audit monthly premium subscription scrapers | 8 |

**Behaviors:**
- Click mission → toggle complete, add/subtract points
- Points earned → triggers parent toast via `onScoreIncrement`
- All complete → full-screen "Mission Clear!" overlay, streak +1
- Reset System button when any mission completed

**Styling:** White card, `shadow-2xl`, green neon progress glow, celebration overlay `#041a05/95`.

---

### 6.8 Pricing (`Pricing.tsx`)

**Position:** `id="pricing"`, `bg-surface-container-low`.

**Purpose:** Compare Free vs Pro plans, drive conversion.

#### Header

- H2: **Simple, transparent.**
- Sub: Choose the brain that fits your lifestyle.
- Toggle: Monthly ↔ Annual Saver (SAVE 20%)

#### Billy Free card (left)

| Field | Value |
|-------|-------|
| Price | ₹0/mo |
| Tagline | Clean fundamental single-ledger tracking |
| Features | Limited OCR, Basic AI insights, 3-day prediction |
| CTA | **Get Started** |

**Styling:** White card, subtle border, outline button.

#### Billy Pro card (right, elevated)

| Field | Value |
|-------|-------|
| Price | ₹50/mo or ₹40/mo annual (₹480 billed) |
| Badge | **Most Selected** |
| Tagline | Ultimate ML predictions and adaptive cash controllers |
| Features | Unlimited OCR, AI Chat, behavior controllers, premium hubs, 90-day engine |
| CTA | **Go Pro Now** |

**Styling:** Dark `#051a05`, `border-2 border-primary`, `md:-translate-y-4` lift, green price text.

#### Modal on plan select

- Title: Welcome to {plan}!
- Copy: Sandbox account activated with 90-day ML access
- CTA: **Launch Live Dashboard**
- z-index 200, backdrop blur

---

### 6.9 GOAT MODE (`GoatMode`)

**Position:** Below pricing. Full-width black section.

**Purpose:** Premium tier teaser / future product hook.

#### Content

- Animated gold trophy (3D rotateY loop)
- H2: **GOAT MODE** (gold `#D4AF37`, up to `text-8xl`)
- Sub: ✦ Coming Soon ✦

**Feature teasers (3 columns):**

| Label | Feature |
|-------|---------|
| Feature | Auto-Sweep Hedge |
| AI Trigger | Macro Arbitrage |
| Accuracy | 99.2% Predictive |

**Styling:** Pure black bg, gold accents, monospace labels, minimal glass cards.

---

### 6.10 Early Access / Beta Signup (`EarlyAccess`)

**Position:** `id="beta"`, inside `max-w-7xl` container.

**Purpose:** Email capture for beta waitlist.

#### Content

- H2: Take control of your money *today.*
- Body: Join 25,000+ individuals, zero setup, 90-day sandbox trial
- Form: email input + **Get Early Access** button
- Trust badges: Bank-level Security, SOC2 Compliant, 256-bit Encryption

#### Behavior

1. Validates email contains `@`
2. 1.2s loading spinner
3. Saves to `localStorage['billy-beta-registrants']` (array of emails)
4. Shows success card with option to register another email

**Styling:** Large green `bg-primary-container` rounded container, blur glows, white form inputs.

---

### 6.11 Footer (`Footer`)

**Position:** Bottom of page. `rounded-t-[3rem]`, `mt-20`.

**Purpose:** Brand, legal links, utility actions.

#### Content

| Zone | Content |
|------|---------|
| Left | Billy logo + © 2026 Billy AI. Built for the Living Ledger. |
| Center | Privacy, Terms, Security, Contact (placeholder `#` links) |
| Right | Share button, Calibrate System Settings button |

#### Behavior

- **Share:** Uses Web Share API or alert with URL
- **Settings:** Alert: "System is calibrated with global UTC database indices."

**Styling:** `bg-stone-50`, circular icon buttons with hover color shifts.

---

## 7. Global State & Data Flow

### 7.1 App-level state (`App.tsx`)

```typescript
inputs: ExternalInputVars = {
  marketTrend: 22,
  politicalEvent: 'stable',
  inflationValue: 4.5,
  globalIndices: 'bull'
}

activeNotification: { id, title, desc, type } | null
```

**Flow:**
- `inputs` passed to `PredictiveCashFlow` → chart + behavior score update
- `setInputs` allows child to mutate simulation
- `triggerNotification` used by chat and passed as `onTriggerAlert`
- `handleScorePoints` called from missions → success toast

### 7.2 Component-local state

| Component | State |
|-----------|-------|
| Header | `isOpen` (mobile menu) |
| PredictiveCashFlow | `chatInput`, `chatLog`, `isTyping` |
| DailyMissions | `missions[]`, `pointsEarned`, `streakCount`, `showCelebration`, `justEarnedPoints` |
| Pricing | `selectedPlan`, `billingCycle` |
| EarlyAccess | `email`, `isSubmitting`, `success` |

### 7.3 Type definitions (`types.ts`)

- `ExternalInputVars` — simulation inputs
- `DayMission` — gamification mission shape
- `ChatMessage`, `SmartAlert` — defined but chat uses inline types in component

---

## 8. Interactions & Animations

| Interaction | Location | Effect |
|-------------|----------|--------|
| Slider change | External Inputs | Chart + metrics recalculate (700ms CSS transition) |
| Political/Global buttons | External Inputs | Immediate state swap, highlighted button |
| Chat submit / chip click | AI Chat | Typing delay 1.2s, then response + optional toast |
| Mission checkbox | Daily Missions | Points +/-, progress bar animate, floating +pts badge |
| All missions complete | Daily Missions | Celebration overlay, streak increment |
| Plan button | Pricing | Modal open with plan name |
| Billing toggle | Pricing | Price switches ₹50 ↔ ₹40 |
| Email submit | Early Access | Spinner → localStorage → success state |
| Logo hover | Header/Footer | Goat icon rotation |
| Hero mascot | Hero | Infinite float Y + rotate |
| Hero insight card | Hero | Infinite float Y |
| GOAT trophy | GoatMode | Infinite rotateY 360° |
| Toast | App | Slide in/out, auto-hide 4.5s |

**Motion library usage:** `motion.div`, `AnimatePresence`, `initial`/`animate`/`exit` props throughout.

---

## 9. Assets & External Resources

### Images (Google-hosted)

| Asset | Used in |
|-------|---------|
| Billy logo (goat head) | Header, Footer |
| Billy mascot (full goat) | Hero floating |
| Dashboard preview screenshot | Hero card |
| Matrix/grid texture | Cash flow dark card background |

### Fonts

- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans...&family=Manrope...`

### Icons

- All from `lucide-react` package (no custom SVG sets except inline trophy in GoatMode)

---

## 10. File Structure Reference

```
billy/
├── index.html              # HTML shell, page title
├── metadata.json           # AI Studio app metadata
├── package.json            # Dependencies & scripts
├── vite.config.ts          # Vite build config
├── src/
│   ├── main.tsx            # React entry
│   ├── App.tsx             # Root layout, global state, toast
│   ├── index.css           # Theme tokens, fonts, base styles
│   ├── types.ts            # TypeScript interfaces
│   └── components/
│       ├── Header.tsx      # Sticky navigation
│       ├── Hero.tsx        # Above-the-fold hero
│       ├── PredictiveCashFlow.tsx  # Brain bento + simulation
│       ├── DailyMissions.tsx       # Gamification section
│       ├── Pricing.tsx             # Plans + modal
│       └── OtherSections.tsx       # Problem, HowItWorks, GoatMode, EarlyAccess, Footer
```

### NPM scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript check (`tsc --noEmit`) |

---

## Quick Reference: Content Inventory

| Section | Primary headline | Key CTA |
|---------|------------------|---------|
| Hero | This isn't tracking. This is control. | Join Free Beta |
| Problem | Tracking is not control. | — |
| Brain | Your AI Financial Brain. | (interactive demo) |
| How It Works | Simple. Smart. Billy. | — |
| Missions | Level up your money game. | Complete missions |
| Pricing | Simple, transparent. | Go Pro Now |
| GOAT MODE | GOAT MODE | Coming Soon |
| Beta | Take control of your money today. | Get Early Access |
| Footer | Built for the Living Ledger. | Share / Settings |

---

*End of report.*
