/* Script to seed Firestore with existing JSON content.
 *
 * Usage:
 *   1. Create a Firebase service account in the Firebase console.
 *   2. Download the JSON key file.
 *   3. Set GOOGLE_APPLICATION_CREDENTIALS to point to that JSON file, e.g.:
 *        export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/serviceAccount.json"
 *   4. Run: npm run seed:firebase
 */

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.warn(
    "[seed-firebase] GOOGLE_APPLICATION_CREDENTIALS is not set. Make sure it points to your Firebase service account JSON file."
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

function loadJson(relativePath) {
  const fullPath = path.join(
    __dirname,
    "..",
    "src",
    "app",
    "components",
    "constants",
    relativePath
  );
  const raw = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(raw);
}

async function clearCollection(name) {
  const snapshot = await db.collection(name).get();
  if (snapshot.empty) {
    console.log(`[seed-firebase] Collection '${name}' is already empty.`);
    return;
  }
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log(`[seed-firebase] Cleared collection '${name}' (${snapshot.size} docs).`);
}

async function seedNews() {
  const data = loadJson("news.json");
  const items = Array.isArray(data.news) ? data.news : [];
  await clearCollection("news");
  if (!items.length) {
    console.log("[seed-firebase] No news items found in news.json");
    return;
  }
  const batch = db.batch();
  const col = db.collection("news");
  items.forEach((item) => {
    const ref = col.doc();
    batch.set(ref, {
      title: item.title || "",
      description: item.description || "",
      image: item.image || "",
      link: item.link || "",
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] Seeded ${items.length} news items.`);
}

async function seedMatches() {
  const items = loadJson("matches.json");
  if (!Array.isArray(items)) {
    console.log("[seed-firebase] matches.json is not an array, skipping.");
    return;
  }
  await clearCollection("matches");
  const batch = db.batch();
  const col = db.collection("matches");
  items.forEach((item, index) => {
    const ref = col.doc(String(item.id ?? index));
    batch.set(ref, {
      team1: item.team1 || "",
      team1Logo: item.team1Logo || "",
      team2: item.team2 || "",
      team2Logo: item.team2Logo || "",
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] Seeded ${items.length} matches.`);
}

async function seedVideos() {
  const items = loadJson("videos.json");
  if (!Array.isArray(items)) {
    console.log("[seed-firebase] videos.json is not an array, skipping.");
    return;
  }
  await clearCollection("videos");
  const batch = db.batch();
  const col = db.collection("videos");
  items.forEach((item) => {
    const ref = col.doc(item.id || undefined);
    batch.set(ref, {
      src: item.src || "",
      thumbnail: item.thumbnail || "",
      title: item.title || {},
      description: item.description || {},
      link: item.link || "",
      date: item.date || "",
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] Seeded ${items.length} videos.`);
}

async function seedAwards() {
  const items = loadJson("awards.json");
  if (!Array.isArray(items)) {
    console.log("[seed-firebase] awards.json is not an array, skipping.");
    return;
  }
  await clearCollection("awards");
  const batch = db.batch();
  const col = db.collection("awards");
  items.forEach((item) => {
    const ref = col.doc(String(item.id));
    batch.set(ref, item);
  });
  await batch.commit();
  console.log(`[seed-firebase] Seeded ${items.length} awards.`);
}

async function seedNewss() {
  const data = loadJson("newss.json");
  const items = Array.isArray(data.news) ? data.news : [];
  await clearCollection("newss");
  if (!items.length) {
    console.log("[seed-firebase] No items found in newss.json");
    return;
  }
  const batch = db.batch();
  const col = db.collection("newss");
  items.forEach((item) => {
    const ref = col.doc(String(item.id));
    batch.set(ref, item);
  });
  await batch.commit();
  console.log(`[seed-firebase] Seeded ${items.length} extended news items (newss).`);
}

async function seedNavData() {
  const data = loadJson("navData.json");
  await clearCollection("navData");
  const col = db.collection("navData");
  await col.doc("main").set(data);
  console.log("[seed-firebase] Seeded navData configuration as document 'main'.");
}

async function main() {
  try {
    console.log("[seed-firebase] Starting seeding...");
    await seedNews();
    await seedMatches();
    await seedVideos();
    await seedAwards();
    await seedNewss();
    await seedNavData();
    console.log("[seed-firebase] Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("[seed-firebase] Error while seeding:", err);
    process.exit(1);
  }
}

main();
