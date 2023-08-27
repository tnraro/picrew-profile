/// <reference types="bun-types" />

import { dirname, join } from "path";

const __dirname = dirname(new URL(import.meta.url).pathname);
const __root = join(__dirname, "../../ui/dist/assets");
const __output = join(__dirname, "../pickle.user.js");

const js: string = await Bun.file(join(__root, "index.js")).text();
const css: string = await Bun.file(join(__root, "index.css")).text();
const template: string = await Bun.file(join(__dirname, "userscript-template.js")).text();

const userscript = [
  template,
  `GM_addStyle(\`${css}\`);`,
  js,
].join("\n");

console.log(__output);

Bun.write(__output, userscript);