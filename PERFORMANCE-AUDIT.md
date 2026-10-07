# Performance & Best Practices Audit

## Main fixes applied

- Route-level lazy loading for all non-active React pages.
- Replaced high-cost local PNG/JPEG assets used by the site with optimized WebP variants.
- Added responsive WebP hero sources (800/1200/1600px) and responsive preload.
- Replaced the external `uniformparahita.com` poster background with the local optimized asset.
- Removed Google Fonts network dependency; the site now uses the locally bundled Geist variable font.
- Corrected PWA icon declarations to use real square 192x192 and 512x512 assets.
- Added favicon and Apple touch icon with real dimensions.
- Deferred YouTube iframe creation on the About page until the user clicks Play.
- Removed full-page blur animations and expensive full-screen backdrop blur layers where they were not needed.
- Changed Navbar scroll bookkeeping from React state to `useRef`, avoiding a render on every scroll tick.
- Removed an unused Products page scroll listener.
- Added image dimensions / decoding / fetch priority to critical hero and logo assets.
- Added basic security response headers in `vercel.json`.
- Added reduced-motion support.

## Verification

- TypeScript source files were checked with the TypeScript parser: 0 syntactic diagnostics.
- The project dependency install/build could not be executed in this environment because npm registry packages were unavailable/could not be installed within the execution window.
