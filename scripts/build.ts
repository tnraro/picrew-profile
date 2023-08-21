import { build } from "bun";

await build({
  entrypoints: ["./index.ts"],
  outdir: "./dist",
  minify: true,
})