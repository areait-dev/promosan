// Secondo passaggio: stringhe negli attributi JSX (title, placeholder, badge...) e nelle
// stringhe dentro i componenti client -> t("chiave", "testo") con l'hook useT().
// Uso: node scripts/wrap-attrs.mjs [--write]
import ts from "typescript"; import fs from "node:fs"; import path from "node:path";
const WRITE = process.argv.includes("--write");
const map = JSON.parse(fs.readFileSync("scripts/.testi-map.json", "utf8"));
const SKIP = [/Testi\.tsx/, /layout\.tsx/, /api[\/]/, /PreviewBanner/, /HeroUnitaMobili/, /VantaggiUnitaMobili/, /ScrollRevealProvider/];
const TECH_ATTR = /^(className|style|href|src|id|key|type|name|value|target|rel|role|htmlFor|alt|aria-.*|data-.*|d|viewBox|fill|stroke.*|width|height|xmlns.*|sizes|loading|color|badgeColor|variant|size|as|k|autoComplete|inputMode|method|action|encType|accept|pattern|lang|dir|ref|onClick|icon|iconName)$/;
const TEXT_ATTR = /^(placeholder|title|label|badge|badgeLabel|badgeText|recommendation|footerText|description|subtitle|text|heading|cta|ctaLabel|buttonLabel|tagline|titolo|sottotitolo|descrizione)$/;
const walk=(d,o=[])=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);e.isDirectory()?walk(p,o):/\.(tsx|jsx)$/.test(e.name)&&o.push(p)}return o};
const slug=(s)=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").split("-").slice(0,6).join("-")||"testo";
const kebab=(s)=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/[^A-Za-z0-9]+/g,"-").toLowerCase();
const prefixFor=(file)=>{const rel=file.split(path.sep).join("/");if(rel.startsWith("app/")){const parts=rel.replace(/^app\//,"").replace(/\/?(page|error|not-found|[A-Za-z]+Client)\.(tsx|jsx)$/,"").split("/").filter(Boolean);return "pagina."+(parts.join("-")||path.basename(rel).replace(/\.\w+$/,"").toLowerCase())}return kebab(path.basename(rel).replace(/\.\w+$/,""))};
const looksLikeText=(s)=>/\p{L}/u.test(s)&&!/^[\w./#:@?=&%-]+$/.test(s)&&!/(px|rem\b|rgba?\(|var\(|gradient|translate|ease\b|\.(png|jpg|jpeg|svg|webp|pdf|mp4)\b)/.test(s);
const isProse=(s)=>looksLikeText(s)&&/\s/.test(s.trim())&&s.length>=12;
let total=0,nfiles=0;
for(const file of [...walk("components"),...walk("app")]){
  if(SKIP.some(r=>r.test(file)))continue;
  const src=fs.readFileSync(file,"utf8");
  if(!/^\s*(\/\/[^\n]*\n\s*)*['"]use client['"]/.test(src))continue; // solo componenti client (useT è un hook)
  const sf=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const prefix=prefixFor(file); const rel=file.split(path.sep).join("/");
  const used=new Map(Object.entries(map[rel]||{})); const byText=new Map([...used].map(([k,v])=>[v,k]));
  const edits=[]; const compInsert=new Map(); // compFunctionNode -> body start
  const compOf=(n)=>{for(let p=n.parent;p;p=p.parent){if(ts.isFunctionDeclaration(p)||ts.isArrowFunction(p)||ts.isFunctionExpression(p)){let nm=p.name?.getText(sf);if(!nm&&p.parent&&ts.isVariableDeclaration(p.parent))nm=p.parent.name.getText(sf);if(nm&&/^[A-Z]/.test(nm))return p;}}return null};
  const inParam=(n)=>{for(let p=n.parent;p;p=p.parent){if(ts.isParameter(p))return true;if(ts.isFunctionLike(p))return false}return false};
  const bad=(n)=>{for(let p=n.parent;p;p=p.parent){
      if(ts.isCallExpression(p)){const t=p.expression.getText(sf);if(/^(console\.|Error$|fetch$|localStorage|sessionStorage|document\.|window\.|\w+\.(querySelector|getElementById|addEventListener|setAttribute|test|match|replace|includes|startsWith|endsWith|split))/.test(t))return true}
      if(ts.isNewExpression(p)&&/^(Error|URL|RegExp)$/.test(p.expression.getText(sf)))return true;
      if(ts.isBinaryExpression(p)&&/^(===|!==|==|!=)$/.test(p.operatorToken.getText(sf)))return true;
      if(ts.isCaseClause(p)||ts.isImportDeclaration(p)||ts.isTypeNode(p)||ts.isEnumMember(p))return true;
      if(ts.isJsxAttribute(p)&&TECH_ATTR.test(p.name.getText(sf)))return true;
      if(ts.isJsxElement(p)&&/^(style|script|code|pre)$/.test(p.openingElement.tagName.getText(sf)))return true;
      if(ts.isPropertyAssignment(p)&&/^(className|style|href|src|id|key|type|name|value|icon|color|bg|background|transition|transform|display|position|fontFamily|border.*|gridTemplate.*|url|link|path|slug|href|image|img)$/i.test(p.name.getText(sf)))return true;
  } return false};
  const visit=(n)=>{
    if((ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))){
      const par=n.parent; const text=n.text;
      if(ts.isPropertyAssignment(par)&&par.name===n){ts.forEachChild(n,visit);return}
      let take=false;
      if(ts.isJsxAttribute(par)){const nm=par.name.getText(sf);take=!TECH_ATTR.test(nm)&&(TEXT_ATTR.test(nm)?looksLikeText(text):isProse(text));}
      else if(isProse(text)&&!ts.isJsxAttribute(par)){take=true}
      if(take&&!bad(n)&&!inParam(n)){
        const comp=compOf(n);
        if(comp&&comp.body&&ts.isBlock(comp.body)){
          const t2=text.replace(/\s+/g," ").trim();
          let key=byText.get(t2);
          if(!key){const base=`${prefix}.${slug(t2)}`;key=base;let i=2;while(used.has(key)&&used.get(key)!==t2)key=`${base}-${i++}`;used.set(key,t2);byText.set(t2,key)}
          const call=`t(${JSON.stringify(key)}, ${JSON.stringify(text)})`;
          edits.push({start:n.getStart(sf),end:n.end,text:ts.isJsxAttribute(par)?`{${call}}`:call});
          compInsert.set(comp,comp.body.getStart(sf)+1);
        }
      }
    }
    ts.forEachChild(n,visit);
  };
  visit(sf);
  if(!edits.length)continue;
  nfiles++; total+=edits.length; map[rel]=Object.fromEntries(used);
  if(WRITE){
    const nl=src.includes("\r\n")?"\r\n":"\n";
    const all=[...edits,...[...compInsert.values()].map(pos=>({start:pos,end:pos,text:`${nl}  const t = useT();`}))];
    let out=src; for(const e of all.sort((a,b)=>b.start-a.start||(b.end-a.end))) out=out.slice(0,e.start)+e.text+out.slice(e.end);
    if(/import \{ T \} from "@\/components\/Testi";/.test(out)) out=out.replace('import { T } from "@/components/Testi";','import { T, useT } from "@/components/Testi";');
    else if(!/useT/.test(out.split("components/Testi")[0]||"")) out=out.replace(/(import [^\n]*\n)(?![\s\S]*?^import )/m,`$1import { useT } from "@/components/Testi";${nl}`);
    fs.writeFileSync(file,out);
  }
  console.log(String(edits.length).padStart(4),rel);
}
if(WRITE) fs.writeFileSync("scripts/.testi-map.json",JSON.stringify(map,null,1));
console.log(`${WRITE?"MODIFICATE":"DRY-RUN"}: ${total} stringhe in ${nfiles} file`);
