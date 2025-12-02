/* Script to seed Firestore with existing JSON content and migrate data.
 * After successful migration, local JSON files will be moved to a backup folder.
 *
 * Usage:
 *   1. Create a Firebase service account in the Firebase console.
 *   2. Download the JSON key file.
 *   3. Set GOOGLE_APPLICATION_CREDENTIALS to point to that JSON file, e.g.:
 *        export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/serviceAccount.json"
 *   4. Run: npm run seed:firebase
 *
 * Note: Local JSON files will be moved to a backup folder after successful migration.
 * To keep them, set KEEP_LOCAL_FILES=true before running.
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
const CONSTANTS_PATH = path.join(__dirname, "..", "src", "app", "components", "constants");
const BACKUP_PATH = path.join(__dirname, "..", "backup-json-files");

// Files to migrate and optionally remove
const JSON_FILES_TO_MIGRATE = [
  "news.json",
  "matches.json",
  "videos.json",
  "awards.json",
  "newss.json",
  "navData.json",
  "players.json"
];

function loadJson(relativePath) {
  const fullPath = path.join(CONSTANTS_PATH, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relativePath}`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(raw);
}

function safeLoadJson(relativePath) {
  try {
    return loadJson(relativePath);
  } catch (err) {
    console.warn(`[seed-firebase] Warning: Could not load ${relativePath}: ${err.message}`);
    return null;
  }
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
  const data = safeLoadJson("news.json");
  if (!data) {
    console.log("[seed-firebase] news.json not found, skipping.");
    return { migrated: false, count: 0 };
  }
  
  const items = Array.isArray(data.news) ? data.news : [];
  await clearCollection("news");
  if (!items.length) {
    console.log("[seed-firebase] No news items found in news.json");
    return { migrated: false, count: 0 };
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
      category: item.category || "Club News",
      date: item.date || new Date().toISOString(),
      readTime: item.readTime || "3",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] ✓ Seeded ${items.length} news items.`);
  return { migrated: true, count: items.length };
}

async function seedMatches() {
  const items = safeLoadJson("matches.json");
  if (!items || !Array.isArray(items)) {
    console.log("[seed-firebase] matches.json not found or invalid, skipping.");
    return { migrated: false, count: 0 };
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
      date: item.date || "",
      time: item.time || "19:00",
      venue: item.venue || "Global Sports Arena",
      competition: item.competition || "league",
      homeScore: item.homeScore ?? null,
      awayScore: item.awayScore ?? null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] ✓ Seeded ${items.length} matches.`);
  return { migrated: true, count: items.length };
}

async function seedVideos() {
  const items = safeLoadJson("videos.json");
  if (!items || !Array.isArray(items)) {
    console.log("[seed-firebase] videos.json not found or invalid, skipping.");
    return { migrated: false, count: 0 };
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
      date: item.date || new Date().toISOString(),
      duration: item.duration || "2:30",
      category: item.category || "training",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] ✓ Seeded ${items.length} videos.`);
  return { migrated: true, count: items.length };
}

async function seedAwards() {
  const items = safeLoadJson("awards.json");
  if (!items || !Array.isArray(items)) {
    console.log("[seed-firebase] awards.json not found or invalid, skipping.");
    return { migrated: false, count: 0 };
  }
  
  await clearCollection("awards");
  const batch = db.batch();
  const col = db.collection("awards");
  items.forEach((item) => {
    const ref = col.doc(String(item.id));
    batch.set(ref, {
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] ✓ Seeded ${items.length} awards.`);
  return { migrated: true, count: items.length };
}

async function seedNewss() {
  const data = safeLoadJson("newss.json");
  if (!data) {
    console.log("[seed-firebase] newss.json not found, skipping.");
    return { migrated: false, count: 0 };
  }
  
  const items = Array.isArray(data.news) ? data.news : [];
  await clearCollection("newss");
  if (!items.length) {
    console.log("[seed-firebase] No items found in newss.json");
    return { migrated: false, count: 0 };
  }
  
  const batch = db.batch();
  const col = db.collection("newss");
  items.forEach((item) => {
    const ref = col.doc(String(item.id));
    batch.set(ref, {
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] ✓ Seeded ${items.length} extended news items (newss).`);
  return { migrated: true, count: items.length };
}

async function seedNavData() {
  const data = safeLoadJson("navData.json");
  if (!data) {
    console.log("[seed-firebase] navData.json not found, skipping.");
    return { migrated: false, count: 0 };
  }
  
  await clearCollection("navData");
  const col = db.collection("navData");
  await col.doc("main").set({
    ...data,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log("[seed-firebase] ✓ Seeded navData configuration as document 'main'.");
  return { migrated: true, count: 1 };
}

async function seedPlayers() {
  let items = safeLoadJson("players.json");
  
  if (!items || !Array.isArray(items)) {
    console.log("[seed-firebase] players.json not found, using default players.");
    items = [
      {
        name: "Samuel Okoye",
        position: "Goalkeeper",
        nationality: "Nigeria",
        jerseyNumber: 1,
        image: "/images/players/player1.jpg",
        story: "A commanding presence between the posts, Samuel joined GSFC in 2020 and has been instrumental in our defensive success.",
        strengths: "Shot stopping, Communication, Distribution",
        joinYear: "2020",
        appearances: 45,
        goals: 0,
        assists: 2,
        cleanSheets: 18
      },
      {
        name: "David Mensah",
        position: "Defender",
        nationality: "Ghana",
        jerseyNumber: 4,
        image: "/images/players/player2.jpg",
        story: "A rock-solid center-back with excellent reading of the game. David has been club captain since 2022.",
        strengths: "Tackling, Aerial duels, Leadership",
        joinYear: "2019",
        appearances: 78,
        goals: 5,
        assists: 3,
        cleanSheets: 25
      },
      {
        name: "Alexei Petrov",
        position: "Midfielder",
        nationality: "Kazakhstan",
        jerseyNumber: 8,
        image: "/images/players/player3.jpg",
        story: "A local talent who came through our academy. Alexei's vision and passing ability make him the creative hub of our midfield.",
        strengths: "Passing, Vision, Set pieces",
        joinYear: "2021",
        appearances: 52,
        goals: 12,
        assists: 24,
        cleanSheets: 0
      },
      {
        name: "Michael Asante",
        position: "Attacker",
        nationality: "Ghana",
        jerseyNumber: 9,
        image: "/images/players/player4.jpg",
        story: "Our prolific striker who has a natural instinct for scoring. Michael leads the line with pace and clinical finishing.",
        strengths: "Finishing, Pace, Movement",
        joinYear: "2022",
        appearances: 40,
        goals: 28,
        assists: 8,
        cleanSheets: 0
      },
      {
        name: "Yuri Volkov",
        position: "Midfielder",
        nationality: "Russia",
        jerseyNumber: 6,
        image: "/images/players/player5.jpg",
        story: "A tireless box-to-box midfielder who covers every blade of grass. Yuri provides balance and energy to the team.",
        strengths: "Stamina, Tackling, Passing",
        joinYear: "2020",
        appearances: 65,
        goals: 7,
        assists: 15,
        cleanSheets: 0
      },
      {
        name: "Emmanuel Kwame",
        position: "Defender",
        nationality: "Ghana",
        jerseyNumber: 3,
        image: "/images/players/player6.jpg",
        story: "A versatile defender who can play anywhere across the back line. Emmanuel's consistency is his greatest asset.",
        strengths: "Versatility, Speed, Marking",
        joinYear: "2021",
        appearances: 48,
        goals: 2,
        assists: 6,
        cleanSheets: 15
      }
    ];
  }

  await clearCollection("players");
  const batch = db.batch();
  const col = db.collection("players");
  items.forEach((item, index) => {
    const ref = col.doc(String(item.id || index + 1));
    batch.set(ref, {
      name: item.name || "",
      position: item.position || "Midfielder",
      nationality: item.nationality || "",
      jerseyNumber: item.jerseyNumber || 0,
      image: item.image || "",
      story: item.story || "",
      strengths: item.strengths || "",
      joinYear: item.joinYear || new Date().getFullYear().toString(),
      appearances: item.appearances || 0,
      goals: item.goals || 0,
      assists: item.assists || 0,
      cleanSheets: item.cleanSheets || 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
  console.log(`[seed-firebase] ✓ Seeded ${items.length} players.`);
  return { migrated: true, count: items.length };
}

// Function to backup and remove local JSON files
function backupAndRemoveLocalFiles() {
  const keepLocal = process.env.KEEP_LOCAL_FILES === "true";
  
  if (keepLocal) {
    console.log("\n[seed-firebase] KEEP_LOCAL_FILES=true, skipping file removal.");
    return;
  }

  // Create backup directory
  if (!fs.existsSync(BACKUP_PATH)) {
    fs.mkdirSync(BACKUP_PATH, { recursive: true });
    console.log(`[seed-firebase] Created backup directory: ${BACKUP_PATH}`);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const timestampedBackup = path.join(BACKUP_PATH, `backup-${timestamp}`);
  fs.mkdirSync(timestampedBackup, { recursive: true });

  let movedCount = 0;
  const movedFiles = [];

  JSON_FILES_TO_MIGRATE.forEach((filename) => {
    const sourcePath = path.join(CONSTANTS_PATH, filename);
    const backupPath = path.join(timestampedBackup, filename);

    if (fs.existsSync(sourcePath)) {
      try {
        // Copy to backup
        fs.copyFileSync(sourcePath, backupPath);
        // Remove original
        fs.unlinkSync(sourcePath);
        movedFiles.push(filename);
        movedCount++;
        console.log(`[seed-firebase] ✓ Moved ${filename} to backup`);
      } catch (err) {
        console.error(`[seed-firebase] ✗ Error moving ${filename}:`, err.message);
      }
    }
  });

  if (movedCount > 0) {
    console.log(`\n[seed-firebase] ✓ Successfully moved ${movedCount} file(s) to backup folder.`);
    console.log(`[seed-firebase] Backup location: ${timestampedBackup}`);
    console.log(`[seed-firebase] Moved files: ${movedFiles.join(", ")}`);
  } else {
    console.log("\n[seed-firebase] No local JSON files found to move.");
  }
}

async function main() {
  try {
    console.log("\n========================================");
    console.log("   Firebase Data Migration Script");
    console.log("========================================\n");
    
    console.log("[seed-firebase] Starting migration...\n");

    const results = {
      news: await seedNews(),
      matches: await seedMatches(),
      videos: await seedVideos(),
      awards: await seedAwards(),
      newss: await seedNewss(),
      navData: await seedNavData(),
      players: await seedPlayers(),
    };

    // Calculate totals
    const totalMigrated = Object.values(results).reduce((sum, r) => sum + r.count, 0);
    const collectionsMigrated = Object.values(results).filter(r => r.migrated).length;

    console.log("\n========================================");
    console.log("   Migration Summary");
    console.log("========================================");
    console.log(`Collections migrated: ${collectionsMigrated}/${Object.keys(results).length}`);
    console.log(`Total documents: ${totalMigrated}`);
    console.log("========================================\n");

    // Backup and remove local files after successful migration
    console.log("[seed-firebase] Migrating local JSON files to backup...");
    backupAndRemoveLocalFiles();

    console.log("\n[seed-firebase] ✓ Migration complete!");
    console.log("[seed-firebase] All data has been migrated to Firebase Firestore.");
    console.log("[seed-firebase] Local JSON files have been moved to backup folder.\n");
    
    process.exit(0);
  } catch (err) {
    console.error("\n[seed-firebase] ✗ ERROR during migration:", err);
    console.error("[seed-firebase] Local files have NOT been removed due to error.\n");
    process.exit(1);
  }
}

main();
