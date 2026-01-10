# Favicons

Favicon assets for the Loyola University Chicago Libraries web presence.

## File Structure

```
favicons/
├── figma_exports/          # Source files from Figma (not deployed)
│   ├── favicon_browser_16.png
│   ├── favicon_browser_16.svg
│   ├── favicon_browser_32.png
│   ├── favicon_browser_32.svg
│   ├── favicon_touch_apple.png           (180×180)
│   ├── favicon_touch_apple.svg
│   ├── favicon_touch_android.png         (192×192)
│   ├── favicon_touch_android.svg
│   ├── favicon_touch_android_maskable.png (192×192, padded)
│   ├── favicon_touch_android_maskable.svg
│   ├── favicon_full.png                  (512×512)
│   └── favicon_full.svg
├── dist/                   # Generated output (deploy this folder)
│   ├── favicon.ico             # Multi-resolution: 16×16 + 32×32
│   ├── favicon.svg             # Scalable for modern browsers
│   ├── apple-touch-icon.png    # iOS home screen (180×180)
│   ├── icon-192.png            # Android/PWA (192×192)
│   ├── icon-192-maskable.png   # Android adaptive icon (192×192)
│   ├── icon-512.png            # PWA splash/large (512×512)
│   └── site.webmanifest        # PWA metadata
├── generate.js             # Build script
└── README.md
```

## Logo Versions

- **Mini logo** (simplified, white border): Used for 16, 32, 180, 192px sizes where detail would be lost
- **Full logo** (detailed, white stroke): Used for 512px where fidelity matters

## Generating

Requires [Deno](https://deno.land/) and [ImageMagick 7+](https://imagemagick.org/).

```bash
cd files/favicons
deno run --allow-run --allow-read --allow-write generate.js
```

## Usage

Add to `<head>` in LibGuides templates:

```html
<link rel="icon" href="https://loyolauniversitychicago.github.io/libraries-assets/favicons/favicon.ico" sizes="32x32">
<link rel="icon" href="https://loyolauniversitychicago.github.io/libraries-assets/favicons/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="https://loyolauniversitychicago.github.io/libraries-assets/favicons/apple-touch-icon.png">
<link rel="manifest" href="https://loyolauniversitychicago.github.io/libraries-assets/favicons/site.webmanifest">
```

For LibGuides CMS, you can also upload `dist/favicon.ico` directly via:  
**Admin → Look & Feel → Page Layout → Favicon**

## Why These Sizes?

| File | Size | Purpose |
|------|------|---------|
| favicon.ico | 16+32 | Legacy browsers, Windows shortcuts |
| favicon.svg | scalable | Modern browsers (Chrome, Firefox, Edge) |
| apple-touch-icon.png | 180×180 | iOS "Add to Home Screen" |
| icon-192.png | 192×192 | Android home screen, PWA icon |
| icon-192-maskable.png | 192×192 | Android adaptive icon (can be cropped to circles, squircles, etc.) |
| icon-512.png | 512×512 | PWA install splash, high-res contexts |

## Maskable Icon

Android can crop icons into various shapes (circles, rounded squares, etc.). The maskable icon includes extra padding so the logo stays within the "safe zone"—the inner 80% of the canvas (~154px centered within 192px). The outer edges may be cropped depending on the device.