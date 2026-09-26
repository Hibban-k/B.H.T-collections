# B.H.T. Collections — Frontend Redesign Implementation Plan (Updated with Brand Guidelines)

## 1. Project Overview & Scope
* **Brand Name:** B.H.T. Collections / Blanket House Trading L.L.C.
* **Bilingual Brand Identity:** `B.H.T. COLLECTIONS` / `بيت البطانيات مجموعات`
* **Goal:** Pixel-accurate, luxury corporate website matching the design mockup and user's brand color theory.
* **Target Project Directory:** `d:\dubaiclinet`

---

## 2. Updated Brand Color System & Design Tokens

### Core Brand Identity Colors (From User Color Theory)
* **Brand Red:** `#DE2628` (Primary action accent, `ENQUIRE` pill button, active highlights)
* **Brand Blue:** `#298DCB` (Secondary brand accent, interactive elements, highlights)
* **Brand Green:** `#149344` (Tertiary brand accent, trust badges, WhatsApp / live status)

### Supporting Corporate Architectural Palette
* **Deep Navy:** `#04192E` (Primary headings, structural containers, footer, hero buttons)
* **Navy Muted / Eyebrows:** `#1E3348` (Eyebrow labels, subtitles)
* **Warm Canvas (Cream):** `#F8F6F0` (Main page background)
* **Light Cream:** `#FBF9F4` (Header, card fills, slider background)
* **Soft Beige:** `#E8E1D7` (Decorative sections, badges)
* **Muted Taupe / Accent:** `#C9B79F` (Subtle dividers and decorative rings)
* **Border:** `#DDD9D0` / `#D9D6CF` (Thin 1px low-contrast borders)
* **White:** `#FFFFFF` (Cards, button text, image backgrounds)
* **Body Text:** `#4A5568` / `#556070` (Readable slate gray, line-height: 1.65)

### Typography
* **Headings (Editorial Serif):** `Playfair Display`, `Cormorant Garamond`, serif
* **Body & UI (Clean Sans):** `Inter`, `Manrope`, sans-serif
* **Arabic Typography:** System / Cairo / Amiri for `بيت البطانيات مجموعات`

---

## 3. Component Architecture & User Customizations

```mermaid
graph TD
    A[app/page.tsx] --> B[Header.tsx - Logo + Arabic Name on Left | Nav + Red ENQUIRE on Right]
    A --> C[HeroSection.tsx - 45/55 Split & Trust Metadata]
    A --> D[BrandCarousel.tsx - Real Brands: Magicwalk, ADDA, Travel Go, Hanaa, Damas Gold, Royalon 3D]
    A --> E[WhoWeAre.tsx - Story + 4-Quadrant Mission Card + Subtle Watermark]
    A --> F[PortfolioSection.tsx - Beyond Textiles + Dubai Circular Composition]
    A --> G[StrengthsGrid.tsx - 6-Card Capability Strip with Hover Lift]
    A --> H[CollectionShowcase.tsx - Bed Sheets, Comforters, Blankets]
    A --> I[RegionalOffices.tsx - 6 Global Presence Cards]
    A --> J[FinalCTA.tsx - Dark Navy 04192E + Metric Counters]
    A --> K[Footer.tsx - 5-Column Corporate Footer + Legal Bar]
```

### Detailed Component Blueprints:

#### 1. Header (`components/layout/Header.tsx`)
* **Height:** `72px`, background `#FBF9F4`, sticky top, bottom border `#DDD9D0`.
* **Left Side (Separated Logo & Bilingual Brand Name):**
  * Separate flower icon (`/bht-flower-icon.png`, height `42px`).
  * Separate bilingual typographic lockup:
    * English: `B.H.T. COLLECTIONS` (Bold sans, 13px, letter-spacing 1px, `#04192E`).
    * Arabic: `بيت البطانيات مجموعات` (11px, elegant Arabic type, `#1E3348`).
* **Right Side (Right-Aligned Nav + Action):**
  * Navigation links: `Home`, `Collection`, `About`, `Contact` (font-size 12px, font-weight 500, `#04192E`, hover red `#DE2628`).
  * Active indicator: Small underline centered under active link.
  * **ENQUIRE Button:** Pill-shaped in **Brand Red (`#DE2628`)** with crisp white text (`padding: 9px 22px; border-radius: 9999px; font-weight: 600; text-transform: uppercase; font-size: 10.5px;`).
  * Mobile hamburger menu icon (3 thin lines).

#### 2. Hero Section (`components/sections/HeroSection.tsx`)
* **Asymmetric 45% / 55% split:**
  * **Left (45%):**
    * Eyebrow: `B.H.T. COLLECTIONS` (Uppercase, tracked 2px, `#1E3348`).
    * H1: *"Premium Essentials.<br/>Built for Better Living."* (Navy serif, 58px).
    * Paragraph: Max-width 380px, font-size 13.5px, line-height 1.65.
    * Buttons:
      * Primary: `EXPLORE COLLECTIONS →` (Navy `#04192E` pill with subtle hover state).
      * Secondary: `GET IN TOUCH` (Outlined with `1px solid #D9D6CF`).
    * Metadata Line: `QUALITY • SUPPLY • TRUST` (10px uppercase, tracked 2.5px).
  * **Right (55%):**
    * Full-bleed master bedroom photography (`/hero-bedroom.jpg`, luxury linens in soft neutral blues and warm ambient lamps).

#### 3. Brands We Represent (`components/sections/BrandCarousel.tsx`)
* **Header:** `BRANDS WE REPRESENT`
* **Real Brand Portfolio Roster (Specified by User):**
  1. **Magicwalk Comfort** (Footwear)
  2. **ADDA** — *"Let's walk together"* (Footwear)
  3. **Travel Go** — *"Super light weight trolley"* / **Infinity Paris** (Luggage)
  4. **Hanaa** (Premium Blankets)
  5. **Damas Gold** (Luxury Blankets)
  6. **Royalon 3D** (Embossed Blankets)
* **Structure:** Horizontal slider strip with circular arrow buttons (`←` / `→`) on the left and right, with equal-height cards bordered with `1px solid #DDD9D0`.

#### 4. Who We Are & Mission (`components/sections/WhoWeAre.tsx`)
* **Left (50%):**
  * Eyebrow: `WHO WE ARE`
  * H2: *"Built on Quality.<br/>Driven by Trust."*
  * Story description + `EXPLORE OUR STORY →` pill button.
* **Right (50% - Mission Card):**
  * Bordered frosted card (`1px solid #D5D1C9`, background `rgba(255, 255, 255, 0.7)`).
  * Card title: `OUR MISSION`
  * 4 Quadrants with clean outline line icons:
    * *Deliver consistent quality* (Diamond/Quality icon)
    * *Build long-term business relationships* (Handshake icon)
    * *Maintain reliable supply* (Truck/Warehouse icon)
    * *Continuously evolve with market needs* (Growth/Chart icon)
* **Background Watermark:** Faint B.H.T. watermark placed at `opacity: 0.045` behind the right quadrant.

#### 5. Other Product Portfolio (`components/sections/PortfolioSection.tsx`)
* **Left Column:**
  * Eyebrow: `BEYOND TEXTILES`
  * H2: *"Other Product Portfolio"*
  * Subtitle: `BLANKET HOUSE TRADING L.L.C.`
  * CTA: `OUR SERVICES →`
  * 3 Category Blocks with minimal outline icons:
    * **Complete Labour Camps Supplies:** Bunker beds, mattresses, blankets, pillows & more.
    * **Travel Suitcases:** ABS, PP, and Fabric luggage (Travel Go / Infinity Paris).
    * **Footwear:** Arabic Style Slippers and ADDA / Magicwalk Comfort branded footwear.
* **Right Column:**
  * Large circular composition (Ø `420px`) with Dubai skyline, travel luggage, and blankets, complemented by a delicate offset gold/taupe accent ring.

#### 6. Our Strengths (`components/sections/StrengthsGrid.tsx`)
* **Header:** H2 *"OUR STRENGTHS"* + subtitle *"Designed for comfort. Built for everyday living."*
* **6 Capabilities Cards:**
  1. *Timely Delivery*
  2. *Professional Sales Team*
  3. *Price Match Guarantee*
  4. *50,000+ SQFT Warehouse Capacity*
  5. *Strong Accountability*
  6. *Continuous Innovation*
* **Card Style:** Thin border (`1px solid #DDD9D0`), no heavy drop shadow, `translateY(-3px)` hover lift.

#### 7. Our Collections Showcase (`components/sections/CollectionShowcase.tsx`)
* **Header:** H2 *"OUR COLLECTIONS"*
* **3 Cards:**
  * **BED SHEETS** (View Collection →)
  * **COMFORTERS** (View Collection →)
  * **BLANKETS** (View Collection →)
* **Micro-interactions:** Subtle image zoom (`scale(1.03)`) and sliding arrow on hover.

#### 8. Regional Offices (`components/sections/RegionalOffices.tsx`)
* **Header:** H2 *"OUR REGIONAL OFFICES"* + *"Global Presence. Local Support."*
* **6 Global Presence Cards:**
  * UAE (Dubai), OMAN (Muscat), QATAR (Doha), SAUDI ARABIA (Riyadh), INDIA (Bangalore), SINGAPORE (Singapore).
* **Card Structure:** Top city photo thumbnail, uppercase country label, city name, and `View Location →`.

#### 9. Final CTA Banner (`components/sections/FinalCTA.tsx`)
* **Container:** Deep Navy (`#04192E`), full width.
* **Left:**
  * Headline: *"Trusted by Businesses. Chosen for Quality."*
  * Supporting paragraph.
  * Primary Button: `EXPLORE ALL COLLECTIONS →` (White pill button or Navy with red/gold hover).
* **Right:**
  * Travel luggage and lifestyle imagery.
  * 3 Large Metrics:
    * **10+** Countries
    * **100+** Product SKUs / Partners
    * **50+** Product Categories

#### 10. Multi-Column Footer (`components/layout/Footer.tsx`)
* **Background:** Deep Navy (`#04192E`).
* **5 Columns:**
  1. *Identity:* B.H.T. Flower logo + English/Arabic name + bio + social links.
  2. *Company:* About, Our Story, Our Strengths.
  3. *Collections:* Bedsheets, Comforters, Blankets, Pillows, Mattresses.
  4. *Business:* Other Products, Brands, Regional Offices.
  5. *Contact:* Phone, Email, Dubai Address, WhatsApp button (Green `#149344`).
* **Sub-footer:** Legal copyright, Privacy Policy, Terms & Conditions, and `Back to top ↑`.

---

## 4. Execution Roadmap

* **Step 1:** Update CSS Variables & Tailwind tokens (`#DE2628`, `#298DCB`, `#149344`, `#04192E`, `#F8F6F0`, `#FBF9F4`) in `app/globals.css`.
* **Step 2:** Refactor `components/layout/Header.tsx` (Separate logo + `B.H.T. COLLECTIONS بيت البطانيات مجموعات`, right-aligned menu, Red `ENQUIRE` pill).
* **Step 3:** Implement `components/sections/BrandCarousel.tsx` with user-specified brands (Magicwalk Comfort, ADDA, Travel Go / Infinity Paris, Hanaa, Damas Gold, Royalon 3D).
* **Step 4:** Build `HeroSection.tsx`, `WhoWeAre.tsx`, `PortfolioSection.tsx`, `StrengthsGrid.tsx`, `CollectionShowcase.tsx`, `RegionalOffices.tsx`, and `FinalCTA.tsx`.
* **Step 5:** Refactor `components/layout/Footer.tsx`.
* **Step 6:** Assemble all sections in `app/page.tsx` and verify live in the browser.
