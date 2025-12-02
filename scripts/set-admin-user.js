/* Script to set admin custom claims for a Firebase user.
 *
 * Usage:
 *   1. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 *   2. Run: node scripts/set-admin-user.js <user-email>
 *
 * Example:
 *   node scripts/set-admin-user.js admin@globalsportsfc.com
 */

const admin = require("firebase-admin");

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error(
    "[set-admin-user] ERROR: GOOGLE_APPLICATION_CREDENTIALS is not set.\n" +
    "Please set it to point to your Firebase service account JSON file."
  );
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const userEmail = process.argv[2];

if (!userEmail) {
  console.error("[set-admin-user] ERROR: Please provide a user email address.");
  console.log("Usage: node scripts/set-admin-user.js <user-email>");
  process.exit(1);
}

async function setAdminUser() {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(userEmail);
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`[set-admin-user] ✓ Successfully set admin privileges for: ${userEmail}`);
    console.log(`[set-admin-user] User UID: ${user.uid}`);
    console.log(`[set-admin-user] Note: User may need to sign out and sign in again for changes to take effect.`);
    
    process.exit(0);
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      console.error(`[set-admin-user] ERROR: User with email "${userEmail}" not found.`);
      console.error("[set-admin-user] Make sure the user has signed up at least once.");
    } else {
      console.error("[set-admin-user] ERROR:", err.message);
    }
    process.exit(1);
  }
}

setAdminUser();



