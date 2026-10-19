Wedding invitation fixes
========================

What changed (intentionally limited):
- Replaced the five small couple-photo assets in images/ with high-resolution painterly wedding portraits, keeping their original filenames so existing gallery references remain compatible.
- Preserved the exact original low-resolution uploads in images/originals-before-enhancement/ in case you want to compare or restore them.
- Fixed two broken image paths in index.html: images/hands.webp -> images/hands.png and art/couple.webp -> art/couple.png.
- Added css/quality-responsive-fixes.css after the original CSS; this adjusts text readability, image crop/alignment, and small-screen text sizes while preserving the original design and JS animation system.

Keep these files/folders together when running the site:
- index.html
- css/
- script.js
- art/
- images/
- favicon.svg

Image note: the enhanced portraits are high-resolution painterly PNGs, not true SVG vector files. Photographs do not convert to true vector cleanly without losing facial and fabric detail; these versions are sized for normal laptop/mobile viewing. AI-generated details may differ subtly from the exact source photographs, so the originals are included separately for comparison and rollback.

- Added a focused zoom-out CSS override: photo frames now match portrait aspect ratios, all couple photos use object-fit: contain to avoid tight crops, and the hover zoom is disabled. The event cards and collage retain the existing visual theme and animation code.
