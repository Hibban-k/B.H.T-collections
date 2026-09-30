# B.H.T. Collections — Designer Handoff

**Latest approved direction · 30 September 2026**  
Companion: `BHT-Collections-Demo.html` — open directly in a browser. All images, fonts, and interactions are embedded.

This document supersedes the earlier design plan where they differ. Use the current HTML demo as the layout and interaction reference. It is an original design demonstration, not a production website.

**Color update applies to this Design Patch only.** The supplied HTML demo deliberately retains its existing palette. For the designer's next version, apply the richer green values below: dark green `#172C26` → `#17452F`, supporting green `#176B50` → `#188345`, and dark-section supporting text `#CDD5CF` → `#D5E2D8`. All other palette colors stay unchanged. Do not treat the demo's older green as the final color specification.

## 1. Direction and latest decisions

Premium, editorial, minimal, and welcoming: generous whitespace, tactile imagery, serif headlines, restrained components, and a clear enquiry path.

- **Complement the logo; do not repeat its three bright colors across the interface.** Retain warm ivory, muted red actions, and deep green. This patch specifies a slightly richer green closer to the logo's green without becoming bright or neon; the demo itself has not been recolored.
- **About summary is a dark section.** Deep green background, ivory headlines, soft light body text, two-column editorial composition.
- **Why Us has four small logos, not one prominent logo panel.** One miniature original logo accompanies each benefit and its matching brand line.
- **How We Work is removed from the homepage.** The former Why Us position now contains the About summary; the former How We Work position now contains the revised Why Us.
- Do not reuse the abandoned website's layouts or imagery. Retain only the supplied B.H.T. logo. The demo uses three newly generated concept photographs.

## 2. Final design system

### Color palette — specification for the designer's next version

| Role / demo token | Hex | Usage |
|---|---|---|
| Primary action / `--red` | `#B62D35` | Buttons on light surfaces, eyebrows, Why Us brand lines |
| Action hover / `--red-hover` | `#92232B` | Primary button hover |
| Action pressed / `--red-active` | `#771C23` | Primary button pressed state |
| Supporting green / `--green` | `#188345` | Small supporting details; a restrained connection to the logo |
| Deep green / `--forest` | `#17452F` | About summary, final CTA, footer, dark navigation details |
| Supporting blue / `--blue` | `#246783` | Informational links and focus outlines on light surfaces |
| Main canvas / `--ivory` | `#F8F6F1` | Page backgrounds and text/buttons on dark green |
| Alternate canvas / `--linen` | `#EEE9E1` | Testimonials, image wells, regional identity panel |
| Surface | `#FFFFFF` | Selected cards, logo backing, forms |
| Heading / `--ink` | `#202723` | Headings on light surfaces |
| Body / `--body` | `#565B57` | Paragraphs and metadata |
| Dark-section body / `--muted-light` | `#D5E2D8` | Supporting copy on deep green |
| Divider / `--border` | `#D8D4CC` | Quiet separators |
| Control boundary / `--control` | `#7A817B` | Inputs and visible control outlines |
| Selected tint / `--selected` | `#F5E7E5` | Selected controls with red text/indicator |
| Minor warm detail | `#C9B79F` | Small category dots on the About summary |

Keep the logo's original colors intact. Use solid section fills; no decorative rainbow gradients, glowing accents, or colored heading fragments. On dark green use ivory buttons with green text. On ivory use muted red buttons with white text. Never rely on color alone for selected states. The specified ivory/deep-green pairing has approximately 10.08:1 contrast; supporting light text/deep-green has 8.14:1.

### Type and spacing

| Element | Specification |
|---|---|
| Display type | Playfair Display, weight 500; sentence case |
| Body and interface | Montserrat, weights 400/500/600 |
| H1 | 40–72px; line-height 1.08 |
| H2 | 30–48px; line-height 1.18; roughly -0.035em tracking |
| H3 | 17–24px depending on component; sans serif |
| Body | 16px baseline; 14px supporting copy; line-height 1.65–1.85 |
| Product titles | 15px desktop / 13px mobile; line-height 1.4 |
| Eyebrows | 10–11px, uppercase; 0.12–0.15em tracking |
| Reading width | Paragraphs limited to approximately 60 characters per line |
| Container | Maximum 1280px; outer gutters 48px desktop, 32px tablet, 20px mobile |
| Section padding | 104px desktop, 80px tablet, 56px mobile |
| Grid gap | 24–32px desktop; 16px mobile; more space between editorial columns |
| Breakpoints | Mobile below 768px; tablet 768–1023px; desktop 1024px and above |
| Corners | 4px for media and buttons; avoid large rounded card shells |
| Controls | Buttons minimum 48px high; interactive targets at least 44px |

Use borders and spacing for separation. Reserve shadows for overlays. Keep important actions visible without hover.

## 3. Page-by-page patch

### Home — exactly eight sections

| Order / section | Purpose, component, and visual treatment | Interaction and responsive behavior |
|---|---|---|
| 1. Hero | Exactly three image panels: Home Textiles, Travel & Luggage, Footwear. Short ivory serif headline and one collection CTA over a darkened image area. | 450ms horizontal transition; 7-second rotation; visible previous/next, pause/play and numbered selectors. Pause on interaction/focus. Portrait-friendly crops on mobile. |
| 2. Main Categories | Exactly three editorial image tiles. Heading: “For home. For journeys. For every day.” Ivory background; names and destination links below images. | Three columns desktop; stack all three on mobile. Images 4:5 desktop, 4:3 mobile. Subtle hover zoom. |
| 3. Exclusive Products | Manual carousel, one featured sample per represented brand. Brand identity, consistent image area, product title, visible enquiry/preview link. White background. | Three cards desktop, two tablet, about 1.15 mobile. Arrows, swipe and keyboard navigation; no autoplay. |
| 4. About summary | **Deep green `#17452F`.** Left: eyebrow and “Many collections. One personal connection.” Right: concise company summary, three category labels, About link. Ivory title and `#D5E2D8` supporting text. | Two columns desktop; title then copy on mobile. Entire content remains visible. |
| 5. Why Us | **Ivory. Four benefits, each with a mini logo and matching brand line.** Heading: “Our care. Your confidence.” Quiet top dividers, no large logo panel. | Four columns desktop, two tablet, one mobile. Use the content and logo sizing below. |
| 6. Client Reviews | Linen background. One serif quotation, attribution, counter and previous/next controls. | Manual navigation only. Full quote on mobile. Demo reviews are clearly illustrative. |
| 7. Featured Region | One Dubai/UAE preview, not a grid of regions. Typographic location panel beside a concise headquarters introduction and Region link. | Two columns desktop; stacked mobile. The panel is intentional; do not substitute a fake office photograph. |
| 8. Final CTA | Deep green. Short serif headline, supporting sentence and ivory “Discuss your requirements” button. | Side-by-side desktop; stacked with full-width action mobile. No newsletter strip. |

#### Why Us — exact content and logo treatment

| Benefit | Matching brand line | Supporting copy |
|---|---|---|
| Quality in the details | “Care you can feel.” | Attention to the materials, finish, and feel of the pieces you choose. |
| A range that works together | “More choice. One connection.” | Home, travel, and footwear collections in one considered destination. |
| People who understand | “Your needs come first.” | A personal conversation about your selection, quantities, and destination. |
| Clarity at every step | “Confidence in every conversation.” | Straightforward communication, from your first enquiry to the next step. |

Each benefit starts with a **44 × 49px visible logo area**, preserving the full original symbol and monogram. A quiet 01–04 index sits opposite. Below: sans-serif benefit title, muted-red Playfair brand line at 21–22px, then supporting copy. These lines are **brand messaging, not customer testimonials**. Use an approved higher-resolution logo asset for final production; the supplied raster is visibly soft when enlarged. Do not redraw or recolor it without approval.

### Collections

1. **Compact introduction:** breadcrumb, left-aligned serif title, short copy on ivory; no campaign banner.
2. **Category navigation:** All Collections plus Home Textiles, Travel & Luggage, and Footwear. Textile subcategory links remain available. White surface; red selected underline. Horizontally scrollable on mobile.
3. **Catalogue:** result count, brand filter, Featured/A–Z sorting, consistent product grid. Four columns desktop, three tablet, two mobile. Mobile filters use a dialog. Selections are URL-backed; 24 items per page; clear reset and empty state.
4. **Enquiry band:** deep green and ivory action.

Product images use 4:5 wells. Brand labels and product titles are sans serif. No fabricated prices or ratings; the demo uses “Enquire for details.” Product previews open in an accessible dialog and carry the selected item into the enquiry page.

### Collection Detail

1. **Breadcrumb and introduction:** short copy and one image in a 5/7 editorial split, image above copy on mobile.
2. **Scoped catalogue:** reuse the Collections toolbar, cards, filters and responsive grid.
3. **Collection information:** linen background, readable narrow text column, accessible FAQ accordions; production shows only approved available content.
4. **Contextual enquiry:** deep green CTA carrying the collection name.

This is a collection landing page. Preserve the existing individual-product URL structure when implementing the real website.

### About

1. **Compact introduction:** serif headline on ivory.
2. **Company introduction:** short positioning beside original editorial imagery, stacked mobile.
3. **Story and facts:** white background; readable narrative with a narrow factual sidebar. Avoid unsupported warehouse sizes, dates, and numerical claims.
4. **Working principles:** deep green; divider-separated entries for quality, range, people, and communication.
5. **Closing enquiry:** ivory section with muted-red action.

### Brand & Partners

1. **Compact introduction:** serif title and short copy on ivory.
2. **Brand portfolio:** two-column editorial grid, one column mobile. Brand identity, category, short description, illustrative image and collection link.
3. **Clients and partners:** separate linen section. Use approved logos when supplied. Current demo intentionally uses plain partner names, not recreated marks.
4. **Partnership CTA:** deep green; carry partnership context to the enquiry page.

### Region

1. **Introduction and country navigation:** ivory; compact wrapping anchor links.
2. **UAE headquarters:** typographic Dubai panel beside company/address/contact details. No invented office photography.
3. **Regional directory:** two columns desktop, one mobile; subtle dividers, readable addresses, direct phone/email links. Use the structured regional contact list and verify it before launch.
4. **General enquiry:** deep green closing CTA.

### Supporting enquiry view

Compact introduction, company contact details and a simple labelled form. Selected product/collection/partnership context pre-fills the subject. In this demo, submission only shows a preview notice: **nothing is sent or stored**. Real delivery, validation, and success/error handling require implementation before launch.

## 4. Shared behavior and handoff checklist

- Header: sticky opaque ivory, 80px desktop / 64px mobile; logo links Home; Collections, About, Brand & Partners, Region; one Enquire action. Mobile navigation is an accessible dialog with Escape, focus containment and focus return.
- Footer: deep green, restrained company information, page links and contact details.
- Motion: buttons 160ms; image zoom 1.025 over 350ms; hero transition 450ms. No scroll hijacking or decorative parallax. Reduced-motion preference disables automatic rotation and motion effects.
- Contrast: normal text at least 4.5:1, large text at least 3:1. Check all final image overlays and focus states; use ivory text on the deep green.
- Images: three original AI-generated concept images are embedded in the demo. Replace with approved product photography and correct brand pairings for production. Do not imply that generated products are actual inventory.
- Content: demo catalogue variants, brand/product pairings and reviews are illustrative. Replace or obtain approval before publishing. Verify contact details and client relationships.
- Routes: the portable demo uses `#/...` navigation. Production routes should be `/`, `/collections`, `/collections/[slug]`, `/about`, `/brands-partners`, `/region`, and the existing `/contact`. No backend or URL migration is included in the demo.
- Verify at 360, 390, 768, 1024 and 1440px; keyboard-only navigation; reduced motion; 200% text zoom; filter reset/Back behavior; image loading; and enquiry context. Earlier browser checks covered the six layouts and key interactions; repeat acceptance checks after real content is inserted.

**Deliverables to review:** the unchanged-color HTML demo for layout and interactions, and this patch for the final design rules and revised green specification. Retain the latest section order and miniature-logo treatment rather than reverting to the initial plan.
