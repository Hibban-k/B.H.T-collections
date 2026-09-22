# B.H.T. Collections — Frontend Design Patch

## Executive diagnosis

The site contains the right commercial ingredients—categories, products, heritage, GCC reach, wholesale credibility and direct enquiry—but presents them with equal visual weight. The result feels busy and template-led instead of selective and premium. The primary failure is attention control: the repeated logo-pattern background, mixed accent colours, numerous proof blocks, heavy discount language and long homepage sequence compete with the products.

**Live watermark audit:** the deployed site currently mounts `watermark-bg.png` as one fixed viewport layer on Home, Collections, Product, About and Contact. It uses `background-repeat: repeat`, `background-size: 550px` and container `opacity: 0.95`. Because it remains visible behind nearly every section, the eye reads it as promotional wallpaper rather than a brand signature.

This patch preserves all pages, content, routes and functionality. It changes only presentation, hierarchy, interaction and responsive behaviour. The revised direction is **logo-led**: the supplied multicolour bilingual lockup becomes the primary brand asset, while the surrounding interface stays controlled enough to let it feel valuable.

## 1. Current weaknesses

- **Brand dilution, not lack of visibility:** the logo appears repeatedly as a faint background motif but is not given one strong, legible focal position. Repetition turns it into decoration; premium prominence comes from a clear lockup, protected space and contrast.
- **No dominant product story:** the homepage hero is mostly typography and pattern rather than an aspirational bedroom/product moment. It explains the category before making visitors feel the comfort.
- **Conflicting visual languages:** modern sans-serif navigation, high-contrast serif headings, bright red rules, cyan/green accents, black cards and multicolour logo marks do not resolve into one recognizable system.
- **Weak imagery control:** category and product imagery varies in crop, lighting, quality and subject. Some images do not clearly represent the named product. This immediately damages trust.
- **Merchandising credibility:** placeholder names such as “dsjkfjkds” and “bank”, extreme discounts such as 90–99%, and implausible crossed-out prices make the catalogue look unfinished. This is a content-quality issue surfaced by design; hide incomplete products from public merchandising until corrected.
- **Attention decay:** the homepage repeats benefits and trust claims, then runs through heritage, features, products, clients, delivery, testimonials and another CTA. The strongest proof is buried and the page has large empty/loading gaps.
- **Conversion ambiguity:** some screens suggest shopping (cart icon, sale prices), while product pages primarily offer WhatsApp/contact actions. Pick a clear model in the interface: “Enquire / Request quote” or “Add to cart”. A cart link currently leads to a 404 and should be removed until the route works.
- **Trust without evidence:** generic claims (“premium quality”, “customer satisfaction”) are less persuasive than concrete facts: established 2009, 50,000+ sq ft warehouse, direct factory relationships, 500+ clients and six GCC markets.
- **Typography and density:** long uppercase labels with wide tracking, dense body copy and oversized serif headings are used too often. This makes information feel ceremonial rather than easy to scan.
- **Accessibility risks:** light grey text, small labels, icon-only controls and red/green semantic cues need stronger contrast, visible focus states and text alternatives.

## 2. Design principles to apply

1. **Product first, proof second, company story third.** Let one strong textile image own the first viewport; place one promise and one action over or beside it.
2. **Restraint signals value.** Remove patterned page backgrounds, excessive badges, decorative rules and repeated benefit cards. Use quiet surfaces and generous but controlled whitespace.
3. **Concrete proof beats adjectives.** Replace generic claims with measurable facts and operational reassurance.
4. **One visual idea per section.** Each section needs a single job: inspire, browse, compare, trust or enquire.
5. **Texture over decoration.** Communicate softness through close-up fabric photography, drape, shadow and crop—not abstract icons or repeated brand marks.
6. **Dual-audience clarity.** Separate “Shop for home” and “Wholesale & hospitality” pathways without creating new pages or changing logic; use existing destinations and contact actions.
7. **Consistency creates trust.** Standardize crop ratios, card anatomy, labels, prices, buttons, form fields and section spacing across all pages.
8. **Build around the real logo.** Use the supplied multicolour **B** emblem with the full “B.H.T. COLLECTIONS” bilingual lockup. Never redraw, recolour, stretch, crop or remove the Arabic line. The UI borrows its colours selectively; it does not compete with all of them at once.

### Logo-first brand system

- Give the complete logo one high-value position in the header on a clean porcelain plate, with at least one-quarter of the logo width as clear space on all sides.
- Add a restrained **brand signature band** beneath the hero copy: a 3 px sequence of BHT red → teal → sky blue. This references the emblem without repeating it as wallpaper.
- On desktop, reserve a 190–220 px header zone for the bilingual lockup. On mobile, use the emblem plus readable “B.H.T. COLLECTIONS” only when the full bilingual lockup would become illegible.
- Repeat the authorized full lockup once in the footer. Elsewhere, use colour, shape and typography—not duplicate logos—to carry recognition.
- The supplied raster is small. Display it near native size until a high-resolution transparent PNG or SVG of the same authorized artwork is available; do not upscale it into a blurred hero graphic.

### Mandatory repeating-watermark system

The client requires the repeated logo background to remain across the site. Treat that as a fixed brand constraint. The design must therefore control the pattern through **scale, opacity, spacing and surface hierarchy** rather than removing it.

- Keep one global, fixed, non-interactive watermark layer using the existing approved `watermark-bg.png`.
- Keep `background-repeat: repeat`, but increase the tile size from the current `550px` to approximately **680–760px desktop**. Fewer repetitions create more breathing room and make each appearance feel intentional.
- Reduce the layer opacity from `0.95` to approximately **0.22–0.30** when using the existing pale `watermark-bg.png`. If the full-colour logo file is used directly, start at **0.08–0.12** instead. Calibrate against real screens; the pattern must be visible but should never become the highest-contrast element.
- On mobile, preserve the repeating watermark but use **420–480px tiles** and reduce opacity to **0.12–0.18**. Do not remove it if the client requires universal presence.
- Keep the watermark visible mainly in page gutters and generous negative space. Place readable content inside white/porcelain surfaces at **94–98% opacity**.
- Product cards, prices, filters, forms, client logos and testimonials use opaque surfaces. The watermark may continue behind those surfaces but must not visually pass through them.
- Use full-width midnight-navy, white or soft-mist sections to interrupt the pattern every one to two scroll lengths. This prevents visual fatigue while keeping the global watermark technically continuous.
- Never add a second watermark layer inside cards or images. One global repeating layer is enough.
- Preserve the logo artwork exactly: no recolouring, stretching, rotation, blur or diagonal “security watermark” treatment.
- Keep the layer `pointer-events: none`, `user-select: none` and `aria-hidden="true"` so it never affects navigation or accessibility.

Recommended implementation:

```css
.site-watermark {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image: url('/watermark-bg.png');
  background-repeat: repeat;
  background-size: 720px auto;
  background-position: center top;
  opacity: 0.26;
  pointer-events: none;
  user-select: none;
}

.page-content {
  position: relative;
  z-index: 1;
}

.content-surface {
  background: rgba(255, 255, 255, 0.96);
}

@media (max-width: 767px) {
  .site-watermark {
    background-size: 450px auto;
    opacity: 0.15;
  }
}
```

## 3. Page-by-page improvements

### Home

- Keep the required repeating watermark behind the page, but place the hero copy on a 96–98% opaque porcelain surface so the headline remains dominant. Use one cinematic bedroom image or product close-up for 55–65% of the desktop viewport.
- Use one eyebrow, one 8–12 word headline, one short support line and two actions: **Explore collections** and **Wholesale enquiries**.
- Replace the four generic benefit cards with a compact proof rail: **Since 2009 · 500+ GCC clients · Direct factory supply · UAE delivery**.
- Follow with a four-card category bento. Use consistent photography; one featured large tile may carry “Most loved”.
- Show 4–6 curated products only. Remove incomplete records and cap visible discount emphasis; product quality must remain the dominant signal.
- Compress heritage into an editorial split block with one archival/warehouse image, a 70–100 word story and three figures.
- Combine clientele and B2B capability into one proof section. Use verified client logos in monochrome and avoid repeating their names as separate cards.
- Show three testimonials maximum; include source/context only if genuine and verifiable.
- End with one split CTA: household assistance via WhatsApp and bulk/hospitality quotation.

### Collections

- Reduce the tall dark title banner to a compact editorial header; bring products into the first viewport.
- Turn category buttons into a horizontally scrollable filter bar on mobile and a quiet segmented control on desktop.
- Add sorting only if supported by existing logic; otherwise do not imitate a working control.
- Use a strict 4:5 image ratio, consistent photography, two-line product titles and aligned price baselines.
- Keep one badge maximum per card. Sale savings should be secondary; never let a discount badge dominate the product.
- Hide draft/demo products from public view until title, image, price and category are credible.

### Product detail

- Remove the repeated background pattern. Use a calm ivory canvas and a white product-information surface.
- Make the gallery the visual anchor: one large 4:5 image plus clear thumbnails; support zoom only if it already exists.
- Order information as: category → name → rating proof → price → 2-line benefit summary → size selection → primary action → delivery/returns reassurance.
- Make selected size unmistakable with fill, border and check—not colour alone.
- Use **Enquire on WhatsApp** as the sole primary action if checkout is not functional; keep Contact as a text link.
- Move long description, materials and care into compact accordions beneath the purchase area.
- “You may also like” should contain only credible, visually related products.

### About

- Reframe the page as a chronological credibility story: **2009 origin → direct sourcing expertise → present GCC network**.
- Break long paragraphs into editorial chapters with one image each. Keep statistics close to the claim they prove.
- Prioritize warehouse, team, sourcing and distribution photography over generic bedroom imagery.
- Separate consumer promise from institutional capability so neither audience has to parse irrelevant copy.

### Contact

- Put WhatsApp, phone and email in one compact contact rail; avoid repeating the same number in multiple cards.
- Place the form and Dubai headquarters details side by side on desktop; form first on mobile.
- Collapse regional offices into an accessible accordion or tabs. Keep the active office’s full details visible.
- Use clear success, error and required-field states. Labels must remain visible after input.

### Header, footer and utility states

- Remove the social-follow strip from the top of the primary journey. Replace it with a deep-navy utility bar carrying one useful promise such as UAE delivery or wholesale support; its contrast frames the light logo plate below.
- Simplify navigation to logo, Shop, About, Contact and one high-intent action. Hide the cart icon while `/cart` returns 404.
- Make the header sticky after scroll with a subtle opaque surface and 1 px border—not a large shadow.
- Reduce footer density, keep legal/business details, and ensure phone/email links match the primary contact data everywhere.
- Redesign 404/empty/loading states in the same visual language. Use skeletons that preserve layout to prevent large blank gaps.

## 4. New visual hierarchy and layout direction

**Desktop page rhythm**

1. Utility line: operational reassurance
2. 72–80 px header
3. 78–88 vh editorial hero
4. Evidence rail
5. Category discovery
6. Curated products
7. Heritage/provenance
8. B2B/client proof
9. Selected testimonials
10. Dual CTA and footer

Use a 12-column grid, `max-width: 1280px`, 24 px gutters, and intentional asymmetry (7/5 or 8/4 splits). Avoid full-width text blocks. Limit normal reading measure to 60–68 characters.

## 5. Typography, colour, spacing and components

### Typography

- **Display:** a refined transitional serif stack: `Iowan Old Style, Baskerville, Georgia, serif`. Use only for H1/H2 and editorial numerals.
- **UI/body:** `Inter, Helvetica Neue, Arial, sans-serif` (or the existing Montserrat at regular/medium weights if avoiding another font asset).
- H1: `clamp(3rem, 6vw, 6.5rem)`, line-height `0.96–1.02`, letter-spacing `-0.035em`.
- H2: `clamp(2rem, 3.8vw, 4rem)`, line-height `1.05`.
- Body: 16–18 px, line-height `1.55–1.7`; UI labels: 12–14 px. Avoid all-caps paragraphs.

### Logo-derived colour tokens

| Token | Value | Use |
|---|---:|---|
| Porcelain | `#F8F7F4` | Primary background and logo breathing space |
| Pure white | `#FFFFFF` | Product cards, forms and elevated surfaces |
| Midnight navy | `#13233A` | Premium anchor, headings, footer and primary buttons |
| BHT red | `#D02E30` | Primary CTA, active state and one strong focal accent |
| BHT teal | `#238D7D` | Trust, service and verified-status details |
| BHT sky | `#3C97C5` | Navigation and section micro-accents only |
| Soft mist | `#DBE4ED` | Tinted sections derived from the logo background |
| Graphite | `#25262C` | Body text |
| Hairline | `#D8DCE2` | Borders and dividers |

Use approximately **58% porcelain, 16% white, 20% midnight navy, 4% BHT red, 1.5% teal and 0.5% sky blue**. Red owns primary actions; teal owns trust/service cues; sky blue appears only as a micro-accent. Never place red, teal and blue in equal visual weight outside the logo.

### Layout language derived from the emblem

- Translate the emblem’s overlapping leaves into **soft asymmetric crops and paired rounded corners**, not literal leaf decorations.
- Use an offset 7/5 hero split: editorial copy on porcelain, immersive bedding imagery on the right, and a slim tri-colour signature line connecting them.
- Use a controlled “petal grid” for collections: one dominant 2-row tile plus four supporting tiles. Each tile receives only one accent edge.
- Alternate white, porcelain and soft-mist surfaces. Reserve midnight navy for products, testimonials and the footer so the page has clear cadence.
- Carry a single red conversion route from hero CTA → selected filter → product CTA → final enquiry.

### Spacing and components

- Base spacing unit: 4 px. Preferred sequence: `8, 12, 16, 24, 32, 48, 72, 96, 128`.
- Section padding: 96–128 px desktop; 64–80 px tablet; 48–64 px mobile.
- Buttons: 48–54 px high, 8 px radius, medium label weight. Primary midnight navy with BHT-red hover; the highest-intent conversion button may be solid BHT red. Avoid pill buttons except filters/chips.
- Cards: 10–14 px radius; 1 px warm border; no permanent heavy shadow. Lift by 4 px on hover with a soft localized shadow.
- Form fields: 52 px minimum height, visible labels, 8 px radius, high-contrast focus ring.
- Icons: one consistent 1.5 px stroke family. Always pair unfamiliar icons with text.

## 6. Premium interaction and animation direction

- Motion should clarify hierarchy, not advertise itself. Use 180–260 ms for UI feedback and 500–750 ms for editorial reveals.
- Hero: the logo resolves first with a subtle 180 ms opacity transition, followed by the headline; the image scales 1.02→1 over 1.2 s. Never animate or separate the internal pieces of the logo.
- Sections: opacity + 20 px translate, triggered at 15% visibility. No long blank states before reveal.
- Product cards: image scale to 1.025, title underline/arrow movement, and subtle elevation. Never animate price or core text.
- Gallery: 220 ms crossfade between images; respect `prefers-reduced-motion`.
- Header: compress slightly after 40 px scroll; preserve layout to avoid content jump.
- Avoid cursor effects, parallax on mobile, continuous marquees, auto-advancing testimonial carousels and simultaneous reveal animations.

## 7. Mobile improvements

- Target a 390 px design baseline and test down to 320 px. Maintain 16–20 px side gutters.
- Keep the first viewport focused: compact utility line, 64 px header, headline, one image, one primary action. Secondary action may sit below.
- Use a bottom-sheet navigation or simple full-screen menu with 48 px tap targets; lock body scroll when open.
- Convert proof rail and filters to horizontal snap rows; do not shrink all items into four tiny columns.
- Product grids: two columns only when titles and prices remain readable; otherwise one featured card followed by two-column browsing.
- Product detail: gallery first, then sticky bottom primary action after the main CTA scrolls out of view. Account for safe-area insets.
- Regional offices, care information and long FAQs become accordions. Forms use correct input types and never place two fields side by side below 480 px.
- Disable decorative motion and heavy image zoom on low-motion/mobile contexts; serve responsive WebP/AVIF assets.

## 8. Priority order

### Critical

1. Remove the cart link or restore `/cart`; it currently resolves to 404.
2. Unpublish placeholder products, incorrect imagery and implausible 90–99% offers.
3. Recalibrate the mandatory repeating watermark using the controlled global system above—larger tiles, lower opacity and protected content surfaces—and fix the homepage’s large lazy-load/animation gaps.
4. Standardize product imagery and make the real conversion path explicit.
5. Consolidate contact numbers, WhatsApp links and trust claims into accurate, consistent data.

### Important

1. Rebuild homepage hierarchy around hero → proof → categories → curated products → provenance → B2B proof → CTA.
2. Apply the colour, type, spacing and component tokens across every page.
3. Simplify header/footer and compress collections filtering.
4. Restructure product detail and contact pages for faster decision-making.
5. Add accessibility-compliant focus, contrast, form and reduced-motion states.

### Polish

1. Add restrained reveal, gallery and card motion.
2. Introduce editorial photography crops and fabric macro imagery.
3. Refine loading, empty and error states.
4. Add a controlled monochrome client-logo system and verified testimonial presentation.

## Success criteria

- Visitors can understand the offer, audience and next action within five seconds.
- Products—not patterns, badges or generic claims—hold the highest visual contrast.
- The homepage reaches products within two scrolls on desktop and one to two on mobile.
- Every public product has credible title, image, price and action data.
- No dead navigation routes; no layout gaps while content loads; WCAG AA contrast and keyboard focus throughout.
