import sharp from "sharp";
import fs from "fs";
import path from "path";

async function generateIcons() {
  const inputPath = path.join(process.cwd(), "public/icons/ai-finance.png");
  const outputDir = path.join(process.cwd(), "public/icons");

  if (!fs.existsSync(inputPath)) {
    console.error("❌ ai-finance.png not found in public/icons/");
    return;
  }

  await sharp(inputPath).resize(192, 192).toFile(path.join(outputDir, "icon-192x192.png"));
  await sharp(inputPath).resize(512, 512).toFile(path.join(outputDir, "icon-512x512.png"));

  console.log("✅ Icons generated: 192x192, 512x512");
}

generateIcons();
