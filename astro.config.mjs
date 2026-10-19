import { defineConfig } from "astro/config";

const review = process.env.ATLAS_REVIEW === "1";
if (review && process.env.GITHUB_ACTIONS === "true") {
  throw new Error(
    "Local draft review builds cannot be generated for GitHub Actions deployment.",
  );
}

export default defineConfig({
  site: "https://amromeo.github.io",
  base: "/vwf-atlas",
  outDir: review ? "./dist-review" : "./dist",
  vite: { define: { __ATLAS_REVIEW__: JSON.stringify(review) } },
});
