import { stitch } from "@google/stitch-sdk";

const PROJECT_ID = process.env.STITCH_PROJECT_ID;
if (!PROJECT_ID) {
  console.error("Define STITCH_PROJECT_ID (ID numérico del proyecto en Stitch).");
  process.exit(1);
}
const project = stitch.project(PROJECT_ID);
const screens = await project.screens();
console.log("Pantallas:", screens.length);
for (const s of screens) {
  const sid = s.screenId ?? s.id;
  console.log("screenId:", sid);
  const html = await s.getHtml();
  const img = await s.getImage();
  console.log("HTML:", html);
  console.log("Imagen:", img);
}
