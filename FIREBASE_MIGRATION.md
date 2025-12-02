# Firebase Migration Guide

This guide explains how to migrate your local JSON data to Firebase Firestore and set up security rules.

## Prerequisites

1. **Firebase Project Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Firebase Storage (if you plan to upload images/videos)

2. **Service Account Key**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely (e.g., `serviceAccount.json`)
   - **DO NOT commit this file to git** (it's already in `.gitignore`)

## Step 1: Set Up Firebase Credentials

### Option A: Environment Variable (Recommended)
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/serviceAccount.json"
```

### Option B: Add to `.env.local`
```bash
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/serviceAccount.json
```

## Step 2: Deploy Security Rules

Before migrating data, deploy the security rules:

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules
```

## Step 3: Run Migration Script

The migration script will:
1. Load all JSON files from `src/app/components/constants/`
2. Clear existing Firestore collections
3. Seed Firestore with data from JSON files
4. Move local JSON files to a backup folder

```bash
npm run seed:firebase
```

### Keep Local Files (Optional)

If you want to keep local JSON files after migration:

```bash
KEEP_LOCAL_FILES=true npm run seed:firebase
```

## Step 4: Verify Migration

1. Check Firebase Console → Firestore Database
2. Verify all collections are populated:
   - `news`
   - `matches`
   - `videos`
   - `awards`
   - `newss`
   - `navData`
   - `players`

## Security Rules Overview

### Firestore Rules
- **Public Read Access**: All collections are readable by anyone
- **Admin Write Access**: Only authenticated admins can create/update/delete
- To grant admin access, set custom claims in Firebase Auth:
  ```javascript
  admin.auth().setCustomUserClaims(uid, { admin: true });
  ```

### Storage Rules
- **Public Images**: Anyone can read, only admins can write
- **Videos**: Public read, admin write
- **User Uploads**: Users can only upload to their own folder

## Collections Structure

### News
```javascript
{
  title: string,
  description: string,
  image: string,
  link: string,
  category: string,
  date: timestamp,
  readTime: string,
  createdAt: timestamp
}
```

### Matches
```javascript
{
  team1: string,
  team1Logo: string,
  team2: string,
  team2Logo: string,
  date: string,
  time: string,
  venue: string,
  competition: string,
  homeScore: number | null,
  awayScore: number | null,
  createdAt: timestamp
}
```

### Videos
```javascript
{
  src: string,
  thumbnail: string,
  title: { en: string, ru?: string, fr?: string, es?: string },
  description: { en: string, ru?: string, fr?: string, es?: string },
  link: string,
  date: string,
  duration: string,
  category: string,
  createdAt: timestamp
}
```

### Players
```javascript
{
  name: string,
  position: string,
  nationality: string,
  jerseyNumber: number,
  image: string,
  story: string,
  strengths: string,
  joinYear: string,
  appearances: number,
  goals: number,
  assists: number,
  cleanSheets: number,
  createdAt: timestamp
}
```

## Backup Files

After migration, local JSON files are moved to:
```
/backup-json-files/backup-[timestamp]/
```

You can restore from backup if needed by copying files back to:
```
src/app/components/constants/
```

## Troubleshooting

### Error: "GOOGLE_APPLICATION_CREDENTIALS is not set"
- Make sure you've set the environment variable pointing to your service account JSON file

### Error: "Permission denied"
- Check that your service account has Firestore Admin permissions
- Verify security rules are deployed correctly

### Error: "Collection not found"
- This is normal for new collections - they'll be created automatically

### Files Not Removed
- Check that migration completed successfully
- Verify you have write permissions in the constants directory
- Check the backup folder for moved files

## Next Steps

1. **Update Admin Dashboard**: Use `/admin` to manage content via Firestore
2. **Set Admin Users**: Grant admin custom claims to authorized users
3. **Monitor Usage**: Check Firebase Console for usage and costs
4. **Backup Strategy**: Consider setting up automated Firestore backups

## Support

For issues or questions:
1. Check Firebase Console for error logs
2. Review Firestore rules in `firestore.rules`
3. Check migration script logs for detailed error messages



