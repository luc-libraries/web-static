/**
 * Favicon Generator
 *
 * Generates production favicon files from Figma exports.
 * Requires ImageMagick 7+ (`magick` command).
 *
 * Usage: deno run --allow-run --allow-read --allow-write generate.js
 */

const EXPORTS_DIR = "./figma_exports";
const OUTPUT_DIR = "./dist";
const BASE_URL = "https://luc-libraries.github.io/web-static/files/favicons/dist";

const run = async (cmd) => {
  const command = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdout: "inherit",
    stderr: "inherit",
  });
  const { code } = await command.output();
  if (code !== 0) {
    throw new Error(`Command failed: ${cmd.join(" ")}`);
  }
};

const fileExists = async (path) => {
  try {
    await Deno.stat(path);
    return true;
  } catch {
    return false;
  }
};

const copyFile = async (src, dest) => {
  await Deno.copyFile(src, dest);
  console.log(`Copied: ${src} → ${dest}`);
};

const generateIco = async () => {
  const src16 = `${EXPORTS_DIR}/favicon_browser_16.png`;
  const src32 = `${EXPORTS_DIR}/favicon_browser_32.png`;
  const dest = `${OUTPUT_DIR}/favicon.ico`;

  if (!(await fileExists(src16)) || !(await fileExists(src32))) {
    throw new Error("Missing favicon_browser_16.png or favicon_browser_32.png");
  }

  await run(["magick", src16, src32, dest]);
  console.log(`Generated: ${dest} (16×16 + 32×32)`);
};

const generateManifest = async () => {
  const manifest = {
    name: "Loyola University Chicago Libraries",
    short_name: "LUC Libraries",
    icons: [
      { src: "icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#8c1d40",
    background_color: "#ffffff",
    display: "standalone",
  };

  const dest = `${OUTPUT_DIR}/site.webmanifest`;
  await Deno.writeTextFile(dest, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Generated: ${dest}`);
};

const generateHtmlSnippet = () => `<!-- Favicons -->
<link rel="icon" href="${BASE_URL}/favicon.ico" sizes="32x32">
<link rel="icon" href="${BASE_URL}/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${BASE_URL}/apple-touch-icon.png">
<link rel="manifest" href="${BASE_URL}/site.webmanifest">
`;

const main = async () => {
  console.log("Generating favicons...\n");

  // Check for ImageMagick
  try {
    await run(["magick", "--version"]);
  } catch {
    console.error("Error: ImageMagick 7+ required. Install with: brew install imagemagick");
    Deno.exit(1);
  }

  // Ensure output directory exists
  await Deno.mkdir(OUTPUT_DIR, { recursive: true });

  // Generate multi-resolution .ico
  await generateIco();

  // Copy static files
  await copyFile(`${EXPORTS_DIR}/favicon_browser_32.svg`, `${OUTPUT_DIR}/favicon.svg`);
  await copyFile(`${EXPORTS_DIR}/favicon_touch_apple.png`, `${OUTPUT_DIR}/apple-touch-icon.png`);
  await copyFile(`${EXPORTS_DIR}/favicon_touch_android.png`, `${OUTPUT_DIR}/icon-192.png`);
  await copyFile(`${EXPORTS_DIR}/favicon_touch_android_maskable.png`, `${OUTPUT_DIR}/icon-192-maskable.png`);
  await copyFile(`${EXPORTS_DIR}/favicon_full.png`, `${OUTPUT_DIR}/icon-512.png`);

  // Generate manifest
  await generateManifest();

  console.log("\n--- HTML Snippet ---\n");
  console.log(generateHtmlSnippet());
  console.log("Done.");
};

main();