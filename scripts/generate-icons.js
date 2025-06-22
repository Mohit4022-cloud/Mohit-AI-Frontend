const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 256, 384, 512];
const publicDir = path.join(__dirname, '..', 'public');

// Create a simple colored square as the base icon
async function generateIcons() {
  for (const size of sizes) {
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#000000"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.3}" fill="white" text-anchor="middle" dominant-baseline="middle">AI</text>
      </svg>
    `;
    
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(publicDir, `icon-${size}x${size}.png`));
    
    console.log(`Generated icon-${size}x${size}.png`);
  }
}

generateIcons().catch(console.error);