import fs from "node:fs";

const src = fs.readFileSync(new URL("../_fdp-dat-planner/styles.css", import.meta.url), "utf8");

function prefixSelectorList(sel) {
  return sel
    .split(",")
    .map((part) => {
      const s = part.trim();
      if (!s) return s;
      if (s === ":root") return ".fdp-dat";
      return `.fdp-dat ${s}`;
    })
    .join(", ");
}

function scope(css) {
  let i = 0;
  let out = "";

  function skipWsAndComments() {
    while (i < css.length) {
      if (css.startsWith("/*", i)) {
        const end = css.indexOf("*/", i);
        out += css.slice(i, end + 2);
        i = end + 2;
        continue;
      }
      if (/\s/.test(css[i])) {
        out += css[i];
        i++;
        continue;
      }
      break;
    }
  }

  function readUntilMatchingBrace(start) {
    let depth = 0;
    let j = start;
    while (j < css.length) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") {
        depth--;
        if (depth === 0) return j;
      }
      j++;
    }
    return css.length - 1;
  }

  while (i < css.length) {
    skipWsAndComments();
    if (i >= css.length) break;

    if (css.startsWith("@keyframes", i) || css.startsWith("@-webkit-keyframes", i)) {
      const end = readUntilMatchingBrace(css.indexOf("{", i));
      out += css.slice(i, end + 1);
      i = end + 1;
      continue;
    }

    if (css.startsWith("@media", i) || css.startsWith("@supports", i)) {
      const brace = css.indexOf("{", i);
      const end = readUntilMatchingBrace(brace);
      const header = css.slice(i, brace).trim();
      const inner = css.slice(brace + 1, end);
      out += `${header} {\n${scope(inner)}\n}`;
      i = end + 1;
      continue;
    }

    const brace = css.indexOf("{", i);
    if (brace === -1) break;
    const sel = css.slice(i, brace).trim();
    const end = css.indexOf("}", brace);
    const body = css.slice(brace + 1, end);
    if (sel) out += `${prefixSelectorList(sel)} {${body}}`;
    i = end + 1;
  }

  return out;
}

let out = scope(src);
out += `
.fdp-dat.page-cream { background: var(--cream); color: var(--ink); }
.fdp-dat { font-family: var(--font-inter), Inter, system-ui, sans-serif; }
.fdp-dat .hd { font-family: var(--fdp-head, inherit); }
`;

fs.writeFileSync(new URL("../components/fdp-dat/fdp-dat.css", import.meta.url), out);
console.log("wrote", out.length);
