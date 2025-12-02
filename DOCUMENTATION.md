# Global Sports FC - Documentation

## Quick Start

### 1. Environment Setup
Environment variables are configured in `.env.local`. See `.env.example` for template.

### 2. Firebase Setup
- **Service Account**: Download from [Firebase Console](https://console.firebase.google.com/project/sportsfc-ddcec/settings/serviceaccounts/adminsdk)
- **Save to**: `firebase-credentials/serviceAccount.json`
- **Run Migration**: `./scripts/auto-migrate.sh`

### 3. Admin Access
After users sign up, grant admin privileges:
```bash
node scripts/set-admin-user.js user@example.com
```

## Production Deployment

### Before Going Live

1. **Update Firestore Rules** (line 19 in `firestore.rules`):
   - Change: `return isAuthenticated();`
   - To: `return isAdmin();`
   - Deploy: `npm run firebase:deploy-rules`

2. **Set Environment Variables** in your hosting platform (Vercel, Netlify, etc.)

3. **Build and Deploy**:
   ```bash
   npm run build
   npm start  # Test locally
   ```

## Firebase Collections

- `news` - News articles
- `matches` - Match schedules and results
- `videos` - Video content
- `players` - Player information
- `awards` - Club awards
- `newss` - Extended news articles
- `navData` - Navigation configuration
- `kidscampRegistrations` - Kids camp registrations

## Scripts

- `npm run seed:firebase` - Migrate data to Firestore
- `npm run firebase:deploy-rules` - Deploy security rules
- `./scripts/auto-migrate.sh` - Auto-detect service account and migrate
- `node scripts/set-admin-user.js <email>` - Grant admin privileges

## Security

- All secrets are in environment variables
- Service account files are in `.gitignore`
- Firestore rules: Public read, Admin write
- Storage rules: Public read, Admin write

## Support

For issues:
1. Check Firebase Console for errors
2. Review migration logs
3. Verify environment variables are set

