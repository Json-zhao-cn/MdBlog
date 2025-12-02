import fs from "fs";
import path from "path";

export function getChildrenHtmlVue(dir: string): string[] {
  const fullPath = path.resolve(__dirname, '..', dir);
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.html.vue'))
    .map(file => path.basename(file, '.html.vue'))
    .sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      return numA - numB;
    });
}
