/**
 * Script to help download Firebase service account key
 * This opens the Firebase Console page where you can download the key
 */

const { exec } = require('child_process');
const os = require('os');

const projectId = 'sportsfc-ddcec';
const serviceAccountUrl = `https://console.firebase.google.com/project/${projectId}/settings/serviceaccounts/adminsdk`;

console.log('\n========================================');
console.log('  Firebase Service Account Setup');
console.log('========================================\n');
console.log('To download your service account key:');
console.log(`1. Open: ${serviceAccountUrl}`);
console.log('2. Click "Generate New Private Key"');
console.log('3. Save the JSON file to a secure location');
console.log('4. Set the environment variable:');
console.log('   export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/serviceAccount.json"\n');

// Try to open the URL in the default browser
const platform = os.platform();
let command;

if (platform === 'darwin') {
  command = `open "${serviceAccountUrl}"`;
} else if (platform === 'win32') {
  command = `start "${serviceAccountUrl}"`;
} else {
  command = `xdg-open "${serviceAccountUrl}"`;
}

exec(command, (error) => {
  if (error) {
    console.log('Could not open browser automatically. Please copy the URL above.\n');
  } else {
    console.log('Opening Firebase Console in your browser...\n');
  }
});
