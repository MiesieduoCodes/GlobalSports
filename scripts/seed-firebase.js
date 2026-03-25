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
  const items = Array.isArray(data?.news) ? data.news : [
    {
      title: "Dominant 3–0 victory cements top-two grip in the KPL",
      description: "A commanding performance at Central Stadium saw Veria FC dismantle FC Kairat with goals in each half, moving to within two points of the league leaders with eight games remaining.\n\nVeria FC showed why they are the most in-form team in the Kazakhstan Premier League right now. From the opening whistle, the pressure was relentless. Team captain A. Seitkali controlled the midfield, providing the assist for the opening goal in the 28th minute.\n\nThe second half was more of the same, with the defense holding firm against Kairat's desperate attempts to find a way back. A late third goal sealed the three points and sent the home crowd into a frenzy.",
      image: "/images/AllPlayers.jpg",
      category: "Match Report",
      date: "Mar 18, 2026",
      readTime: "4"
    },
    {
      title: "Kazakh international winger K. Nurlan signs three-year deal",
      description: "Veria FC is delighted to announce the signing of K. Nurlan from FC Tobol. The 24-year-old winger has signed a three-year contract at Central Stadium.\n\nKnown for his pace and technical ability, Nurlan is expected to bolster the club's attacking options as they push for the title. 'I am honored to join Veria FC,' Nurlan said. 'The ambition of this club is incredible, and I want to help bring trophies to Almaty.'",
      image: "/images/Handsake.jpg",
      category: "Transfer",
      date: "Mar 15, 2026",
      readTime: "3"
    },
    {
      title: "Veria Sport Academy U17s crowned regional champions",
      description: "The future looks bright for Veria FC as our U17 Academy team secured the regional championship title this weekend with a 2-0 win in the final.\n\nHead of Academy spoke about the achievement: 'These boys have worked incredibly hard. This is just the beginning of our vision to develop local talent for the first team.'",
      image: "/images/kneelingimage.jpg",
      category: "Academy",
      date: "Mar 12, 2026",
      readTime: "2"
    },
    {
      title: "New South Stand expansion to add 3,000 seats for 2026/27",
      description: "Veria FC can confirm that plans for the South Stand expansion at Central Stadium have been approved. The project will add 3,000 extra seats, bringing total capacity to 25,000.\n\nConstruction is set to begin in the off-season. 'Our fanbase is growing rapidly, and we need to ensure everyone has a place to support the club,' said the Strategic Manager.",
      image: "/images/LOGO-photoaidcom-cropped.jpg",
      category: "Club News",
      date: "Mar 8, 2026",
      readTime: "3"
    }
  ];

  await clearCollection("news");
  if (!items.length) {
    console.log("[seed-firebase] No news items found");
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
    console.log("[seed-firebase] players.json not found, using HTML-based players.");
    items = [
      { name: "A. Seitkali", position: "GK", jerseyNumber: 1, nationality: "Kazakhstan", image: "", story: "Reliable first-choice goalkeeper for Veria FC.", strengths: "Reflexes, Distribution", joinYear: "2024", appearances: 45, goals: 0, assists: 1, cleanSheets: 18 },
      { name: "D. Bekzhanov", position: "GK", jerseyNumber: 13, nationality: "Kazakhstan", image: "", story: "Promising young goalkeeper with great potential.", strengths: "Shot stopping, Bravery", joinYear: "2025", appearances: 12, goals: 0, assists: 0, cleanSheets: 4 },
      { name: "M. Akhmetov", position: "CB", jerseyNumber: 2, nationality: "Kazakhstan", image: "", story: "A rock at the heart of the defense.", strengths: "Tackling, Aerial duels", joinYear: "2024", appearances: 52, goals: 3, assists: 1, cleanSheets: 20 },
      { name: "D. Bekov", position: "CB", jerseyNumber: 4, nationality: "Kazakhstan", image: "", story: "Disciplined defender with excellent positioning.", strengths: "Interceptions, Marking", joinYear: "2023", appearances: 78, goals: 2, assists: 2, cleanSheets: 25 },
      { name: "Y. Sartaev", position: "CB", jerseyNumber: 5, nationality: "Kazakhstan", image: "", story: "Powerful defender known for his physical presence.", strengths: "Strength, Headers", joinYear: "2024", appearances: 40, goals: 5, assists: 0, cleanSheets: 15 },
      { name: "K. Zhaksybekov", position: "LB", jerseyNumber: 3, nationality: "Kazakhstan", image: "", story: "Attacking full-back with great crossing ability.", strengths: "Crossing, Stamina", joinYear: "2025", appearances: 28, goals: 1, assists: 8, cleanSheets: 10 },
      { name: "A. Dzhaksybekov", position: "RB", jerseyNumber: 22, nationality: "Kazakhstan", image: "", story: "Fast and reliable right-back.", strengths: "Speed, Tackling", joinYear: "2024", appearances: 44, goals: 1, assists: 5, cleanSheets: 16 },
      { name: "B. Nurmagambetov", position: "DM", jerseyNumber: 6, nationality: "Kazakhstan", image: "", story: "Tireless defensive midfielder who breaks up play effectively.", strengths: "Stamina, Tackling", joinYear: "2024", appearances: 50, goals: 2, assists: 4, cleanSheets: 18 },
      { name: "R. Islamov", position: "CM", jerseyNumber: 8, nationality: "Kazakhstan", image: "", story: "Creative midfielder with a wide range of passing.", strengths: "Passing, Vision", joinYear: "2023", appearances: 85, goals: 12, assists: 25, cleanSheets: 0 },
      { name: "N. Zhukov", position: "AM", jerseyNumber: 10, nationality: "Russia", image: "", story: "The creative engine of the team, known for his flair.", strengths: "Dribbling, Skills", joinYear: "2024", appearances: 38, goals: 15, assists: 20, cleanSheets: 0 },
      { name: "T. Ospanov", position: "CM", jerseyNumber: 14, nationality: "Kazakhstan", image: "", story: "Versatile midfielder who contributes in both defense and attack.", strengths: "Versatility, Work rate", joinYear: "2025", appearances: 22, goals: 4, assists: 6, cleanSheets: 0 },
      { name: "E. Kaliyev", position: "DM", jerseyNumber: 16, nationality: "Kazakhstan", image: "", story: "Strategic midfielder with great tactical intelligence.", strengths: "Positioning, Interceptions", joinYear: "2024", appearances: 48, goals: 1, assists: 3, cleanSheets: 0 },
      { name: "K. Abenov", position: "ST", jerseyNumber: 9, nationality: "Kazakhstan", image: "", story: "Prolific striker who leads the line with confidence.", strengths: "Finishing, Strength", joinYear: "2024", appearances: 46, goals: 32, assists: 10, cleanSheets: 0 },
      { name: "K. Nurlan", position: "LW", jerseyNumber: 7, nationality: "Kazakhstan", image: "", story: "Dynamic winger with incredible speed and crossing skills.", strengths: "Speed, Dribbling", joinYear: "2026", appearances: 8, goals: 4, assists: 6, cleanSheets: 0 },
      { name: "A. Seidaliev", position: "RW", jerseyNumber: 11, nationality: "Kazakhstan", image: "", story: "Technical winger who excels in 1v1 situations.", strengths: "Technique, Agility", joinYear: "2025", appearances: 30, goals: 9, assists: 12, cleanSheets: 0 },
      { name: "Z. Baimanov", position: "ST", jerseyNumber: 19, nationality: "Kazakhstan", image: "", story: "Young striker with a natural nose for goal.", strengths: "Movement, Finishing", joinYear: "2025", appearances: 15, goals: 7, assists: 2, cleanSheets: 0 }
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
