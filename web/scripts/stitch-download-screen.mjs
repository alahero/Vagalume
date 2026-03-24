/**
 * Obtiene URLs firmadas de Stitch (get_screen) y descarga HTML + captura.
 *
 * Carga opcionalmente STITCH_API_KEY desde `.env.stitch` en la raíz del repo
 * si aún no está en el entorno.
 *
 * Uso (PowerShell, raíz del repo):
 *   node web/scripts/stitch-download-screen.mjs
 *   node web/scripts/stitch-download-screen.mjs --out ../Assets/stitch-import
 *
 * Variables opcionales: STITCH_PROJECT_ID, STITCH_SCREEN_ID
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stitch } from "@google/stitch-sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadRootEnvStitch() {
  const envPath = path.join(__dirname, "..", "..", ".env.stitch");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function parseArgs(argv) {
  const out = { outputDir: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out" && argv[i + 1]) {
      out.outputDir = argv[++i];
    }
  }
  return out;
}

async function downloadToFile(url, filePath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Descarga fallida ${res.status}: ${url.slice(0, 80)}…`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(filePath, buf);
  return buf.length;
}

loadRootEnvStitch();

const { outputDir: outArg } = parseArgs(process.argv.slice(2));

const PROJECT_ID =
  process.env.STITCH_PROJECT_ID || "321000054856538253";
const SCREEN_ID =
  process.env.STITCH_SCREEN_ID || "ae510f3055ed4e56a7b949fd6ae48d2a";

const outputDir =
  outArg ||
  path.join(__dirname, "..", "..", "Assets", "stitch-import-minimalist-brand-photos");

if (!process.env.STITCH_API_KEY?.trim()) {
  const envPath = path.join(__dirname, "..", "..", ".env.stitch");
  console.error(
    "Falta STITCH_API_KEY. Configúrala en el entorno o en .env.stitch en la raíz del repo."
  );
  if (existsSync(envPath)) {
    const raw = readFileSync(envPath, "utf8");
    const keyLine = raw.split(/\r?\n/).find((l) => /^\s*STITCH_API_KEY\s*=/.test(l));
    if (keyLine && !keyLine.split("=").slice(1).join("=").trim()) {
      console.error(
        "\nNota: .env.stitch existe pero el valor tras = está vacío en disco. Guarda el archivo en el editor (Ctrl+S) y vuelve a ejecutar."
      );
    }
  }
  process.exit(1);
}

const project = stitch.project(PROJECT_ID);
const screen = await project.getScreen(SCREEN_ID);

const htmlUrl = await screen.getHtml();
const imageUrl = await screen.getImage();

if (!htmlUrl || !imageUrl) {
  console.error("La API no devolvió URLs de descarga.", { htmlUrl, imageUrl });
  process.exit(1);
}

console.log("URL HTML (también usable con curl -L -o code.html):");
console.log(htmlUrl);
console.log("\nURL captura (curl -L -o screen.png):");
console.log(imageUrl);

await mkdir(outputDir, { recursive: true });

const htmlPath = path.join(outputDir, "code.html");
const imgPath = path.join(outputDir, "screen.png");

const nHtml = await downloadToFile(htmlUrl, htmlPath);
const nImg = await downloadToFile(imageUrl, imgPath);

console.log(`\nGuardado: ${htmlPath} (${nHtml} bytes)`);
console.log(`Guardado: ${imgPath} (${nImg} bytes)`);
