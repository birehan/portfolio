import Beasties from "beasties";
import { readFile, writeFile, glob } from "node:fs/promises";

// Post-processes the static export: inlines each page's critical CSS and
// loads the rest of the stylesheet asynchronously. Next's experimental
// optimizeCss/critters does not run on App Router static-export HTML, so we
// do it here over the emitted `out/**/*.html` files.
const beasties = new Beasties({
  path: "out",
  publicPath: "/",
  preload: "swap",
  pruneSource: false,
  inlineFonts: false,
  preloadFonts: false,
  logLevel: "info",
});

let count = 0;
for await (const file of glob("out/**/*.html")) {
  const html = await readFile(file, "utf8");
  const processed = await beasties.process(html);
  await writeFile(file, processed, "utf8");
  count += 1;
}

console.log(`[inline-critical-css] processed ${count} HTML file(s)`);
