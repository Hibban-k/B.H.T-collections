const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\SASP&ITs\\.gemini\\antigravity-ide\\brain\\90b18149-cea9-4010-b0ef-b613573e0f79\\.user_uploaded\\media_1788296904976.png';

async function processLogos() {
  const metadata = await sharp(srcPath).metadata();
  console.log('Image dimensions:', metadata.width, 'x', metadata.height);

  const outDir = path.join(__dirname, 'public', 'clientele');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // The image is a banner with the white container in the middle containing 5 logos:
  // In the image (approx 1024 width or similar):
  // Let's find the bounding box of the white banner inside the image.
  // We can also extract the exact 5 logos by relative percentages or coordinates:
  // Let's first extract the central logo strip:
  // White card roughly: left: 13%, top: 41%, width: 74%, height: 20% of image.
  
  const w = metadata.width;
  const h = metadata.height;

  // Let's extract the full logo strip with high quality
  const stripLeft = Math.round(w * 0.125);
  const stripTop = Math.round(h * 0.405);
  const stripWidth = Math.round(w * 0.75);
  const stripHeight = Math.round(h * 0.20);

  await sharp(srcPath)
    .extract({ left: stripLeft, top: stripTop, width: stripWidth, height: stripHeight })
    .png()
    .toFile(path.join(__dirname, 'public', 'clientele-strip.png'));
  console.log('Saved clientele-strip.png');

  // Now extract each individual logo from within the strip:
  // 1. LOT (LULU ON THE MOVE): ~ 0% to 20%
  // 2. MARK & SAVE: ~ 20% to 38%
  // 3. AL MADINA: ~ 38% to 58%
  // 4. TALAL GROUP: ~ 58% to 77%
  // 5. SHAKLAN: ~ 77% to 100%

  const logos = [
    { name: 'lulu-lot.png', xRel: 0.01, wRel: 0.20 },
    { name: 'mark-and-save.png', xRel: 0.20, wRel: 0.19 },
    { name: 'al-madina.png', xRel: 0.38, wRel: 0.20 },
    { name: 'talal-group.png', xRel: 0.58, wRel: 0.20 },
    { name: 'shaklan.png', xRel: 0.77, wRel: 0.22 },
  ];

  for (const logo of logos) {
    const lLeft = Math.round(stripLeft + stripWidth * logo.xRel);
    const lTop = stripTop;
    const lWidth = Math.round(stripWidth * logo.wRel);
    const lHeight = stripHeight;

    await sharp(srcPath)
      .extract({ left: lLeft, top: lTop, width: lWidth, height: lHeight })
      .trim() // automatically trims white space borders
      .extend({ top: 12, bottom: 12, left: 16, right: 16, background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(outDir, logo.name));
    console.log(`Saved ${logo.name}`);
  }
}

processLogos().catch(console.error);
