// Genera: contenuti-legali/*.html (da incollare nelle pagine WP) e TESTI-SITO.md (elenco chiavi).
import ts from "typescript"; import fs from "node:fs"; import path from "node:path";
const esc=(s)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const dec=(s)=>s.replace(/&apos;/g,"'").replace(/&quot;/g,'"').replace(/&nbsp;/g," ").replace(/&egrave;/g,"è").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n));

// --- pagine legali ---
fs.mkdirSync("contenuti-legali",{recursive:true});
for(const slug of ["cookie-policy","privacy-policy","termini-e-condizioni"]){
  const f=`app/${slug}/page.tsx`; const src=fs.readFileSync(f,"utf8");
  const sf=ts.createSourceFile(f,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  let intro="",sections=[];
  const v=(n)=>{ if(ts.isJsxAttribute(n)){const nm=n.name.getText(sf);const init=n.initializer;
      if(nm==="intro"&&init) intro=ts.isStringLiteral(init)?init.text:eval("("+init.expression.getText(sf)+")");
      if(nm==="sections"&&init) sections=eval("("+init.expression.getText(sf)+")"); }
    ts.forEachChild(n,v)}; v(sf);
  let html=intro?`<p>${esc(intro)}</p>\n\n`:"";
  for(const s of sections){
    if(s.heading) html+=`<h2>${esc(s.heading)}</h2>\n`;
    for(const p of s.paragraphs||[]) html+=`<p>${esc(p)}</p>\n`;
    if(s.table){html+="<table>\n<thead><tr>"+s.table.headers.map(h=>`<th>${esc(h)}</th>`).join("")+"</tr></thead>\n<tbody>\n";
      for(const r of s.table.rows) html+="<tr>"+r.map(c=>`<td>${esc(c)}</td>`).join("")+"</tr>\n"; html+="</tbody>\n</table>\n";}
    html+="\n";
  }
  fs.writeFileSync(`contenuti-legali/${slug}.html`,html);
  console.log(slug, sections.length,"sezioni");
}

// --- elenco chiavi ---
const map=JSON.parse(fs.readFileSync("scripts/.testi-map.json","utf8"));
const groups={};
for(const [file,m] of Object.entries(map)){ const g=file.replace(/^components\//,"").replace(/^app\//,"pagina: ").replace(/\.(tsx|jsx)$/,""); groups[g]=m; }
let md=`# Testi del sito modificabili da WordPress

Come si usa:
1. In WordPress apri **Pagine → Opzioni Globali** e cerca il campo **Testi del sito (personalizzazioni)**.
2. Aggiungi una riga per ogni testo che vuoi cambiare, nel formato \`chiave = nuovo testo\`.
3. Se una chiave non c'è, o il testo dopo \`=\` è vuoto, il sito usa il testo predefinito qui sotto.
4. Per andare a capo dentro un testo scrivi \`\n\`. Le righe che iniziano con \`#\` sono commenti.
5. Salva: il sito si aggiorna entro pochi secondi (o al massimo 1 minuto).

Esempio:
\`\`\`
contatti-form.richiedi-preventivo = Chiedi un preventivo gratuito
orari-contatti.chiamaci = Telefonaci
\`\`\`

I testi lunghi e strutturati (liste di servizi, news, FAQ, sedi, pacchetti, contenuti delle pagine) restano nei loro campi dedicati di WordPress.
Le pagine **Cookie Policy**, **Privacy Policy** e **Termini e Condizioni** si modificano creando in WordPress pagine con gli stessi slug (vedi \`contenuti-legali/\`).

`;
let n=0;
for(const g of Object.keys(groups).sort()){
  md+=`\n## ${g}\n\n| Chiave | Testo predefinito |\n|---|---|\n`;
  for(const [k,t] of Object.entries(groups[g])){ md+=`| \`${k}\` | ${dec(t).replace(/\|/g,"\|")} |\n`; n++; }
}
fs.writeFileSync("TESTI-SITO.md",md);
console.log(n,"chiavi in TESTI-SITO.md");
