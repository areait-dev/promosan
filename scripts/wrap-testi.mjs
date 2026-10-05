// Avvolge i testi statici del JSX in <T k="chiave">testo</T> (vedi components/Testi.tsx).
// Uso: node scripts/wrap-testi.mjs [--write]   (senza --write: solo report)
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";

const WRITE = process.argv.includes("--write");
const ROOTS = ["components", "app"];
const SKIP_FILES = [/HeroUnitaMobili/, /VantaggiUnitaMobili/, /components[\/]Testi\.tsx$/, /app[\/]layout\.tsx$/, /PreviewBanner/, /[\/]api[\/]/];
const SKIP_TAGS = new Set(["style", "script", "code", "pre"]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx|jsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

const slug = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").split("-").slice(0, 6).join("-") || "testo";

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[^A-Za-z0-9]+/g, "-").toLowerCase();

function prefixFor(file) {
  const rel = file.split(path.sep).join("/");
  if (rel.startsWith("app/")) {
    const parts = rel.replace(/^app\//, "").replace(/\/?(page|error|not-found|[A-Za-z]+Client)\.(tsx|jsx)$/, "").split("/").filter(Boolean);
    return "pagina." + (parts.join("-") || path.basename(rel).replace(/\.\w+$/, "").toLowerCase());
  }
  return kebab(path.basename(rel).replace(/\.\w+$/, ""));
}

const report = {};
let totalFiles = 0, totalTexts = 0;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (SKIP_FILES.some((r) => r.test(file))) continue;
    const src = fs.readFileSync(file, "utf8");
    const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith("x") && file.endsWith(".jsx") ? ts.ScriptKind.JSX : ts.ScriptKind.TSX);
    const edits = [];
    const prefix = prefixFor(file);
    const used = new Map(); // key -> testo
    const byText = new Map(); // testo -> key

    const insideSkipped = (n) => {
      for (let p = n.parent; p; p = p.parent) {
        if (ts.isJsxElement(p)) {
          const tag = p.openingElement.tagName.getText(sf);
          if (SKIP_TAGS.has(tag) || tag === "T") return true;
        }
      }
      return false;
    };

    const visit = (n) => {
      if (ts.isJsxText(n) && !insideSkipped(n)) {
        const raw = src.slice(n.pos, n.end);
        const m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
        const body = m[2];
        if (body && /\p{L}/u.test(body)) {
          const text = body.replace(/\s+/g, " ");
          let key = byText.get(text);
          if (!key) {
            const base = `${prefix}.${slug(text)}`;
            key = base;
            let i = 2;
            while (used.has(key) && used.get(key) !== text) key = `${base}-${i++}`;
            used.set(key, text);
            byText.set(text, key);
          }
          const start = n.getStart(sf, false) - 0;
          const full = n.pos; // include leading trivia
          const lead = m[1].length;
          edits.push({ start: full + lead, end: full + lead + body.length, text: `<T k="${key}">${body}</T>` });
        }
      }
      ts.forEachChild(n, visit);
    };
    visit(sf);
    if (!edits.length) continue;

    totalFiles++; totalTexts += edits.length;
    report[file.split(path.sep).join("/")] = Object.fromEntries(used);

    if (WRITE) {
      let out = src;
      for (const e of edits.sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end);
      // import
      const nl = out.includes("\r\n") ? "\r\n" : "\n";
      const imp = `import { T } from "@/components/Testi";`;
      if (!out.includes(imp)) {
        const useClient = out.match(/^(\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*)*)?(['"]use client['"];?\s*)/);
        const lines = out.split(/\r?\n/);
        let idx = 0, lastImport = -1;
        for (let i = 0; i < lines.length; i++) if (/^import\s/.test(lines[i]) || /^\} from /.test(lines[i])) lastImport = i;
        if (lastImport >= 0) {
          // se l'ultimo "import" è multi-riga, avanza fino al punto e virgola
          let j = lastImport; while (j < lines.length && !/;\s*$/.test(lines[j]) && !/from\s+['"]/.test(lines[j])) j++;
          lines.splice(j + 1, 0, imp);
        } else {
          const uc = lines.findIndex((l) => /^['"]use client['"]/.test(l));
          lines.splice(uc >= 0 ? uc + 1 : 0, 0, imp);
        }
        out = lines.join(nl);
      }
      fs.writeFileSync(file, out);
    }
  }
}

fs.writeFileSync(path.join(process.env.TEMP || ".", "testi-report.json"), JSON.stringify(report, null, 1));
fs.writeFileSync("scripts/.testi-map.json", JSON.stringify(report, null, 1));
console.log(`${WRITE ? "MODIFICATI" : "DRY-RUN"}: ${totalTexts} testi in ${totalFiles} file`);
for (const [f, m] of Object.entries(report)) console.log(String(Object.keys(m).length).padStart(4), f);
