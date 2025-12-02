# Production Readiness Checklist

## ✅ Completed

### 1. Firebase Configuration
- [x] Firestore security rules deployed
- [x] Firebase config moved to environment variables
- [x] `.env.example` created with all required variables
- [x] `.firebaserc` configured with project ID

### 2. Security
- [x] Hardcoded Firebase API keys moved to environment variables
- [x] Hardcoded EmailJS credentials moved to environment variables
- [x] Service account keys excluded from git (`.gitignore`)
- [x] Firestore rules configured (public read, authenticated/admin write)

### 3. Code Quality
- [x] Error handling implemented in all data fetching components
- [x] Loading states implemented
- [x] Console.error used appropriately for error logging

## ⚠️ Action Required Before Production

### 1. Environment Variables Setup

Create a `.env.local` file with the following variables:

```bash
# Firebase Configuration (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sportsfc-ddcec.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sportsfc-ddcec
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sportsfc-ddcec.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=429557761438
NEXT_PUBLIC_FIREBASE_APP_ID=1:429557761438:web:44a1f839da704c238dc28f
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-G9HFY2B01K

# Firebase Admin SDK (for migration script)
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/serviceAccount.json

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_mofzwum
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_ormpbz2
NEXT_PUBLIC_EMAILJS_USER_ID=a1NybmXRcYdkYXTu6
```

### 2. Firebase Service Account Setup

1. Go to [Firebase Console](https://console.firebase.google.com/project/sportsfc-ddcec/settings/serviceaccounts/adminsdk)
2. Click "Generate New Private Key"
3. Save the JSON file securely
4. Set environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/serviceAccount.json"
   ```

### 3. Run Data Migration

After setting up service account:

```bash
npm run seed:firebase
```

This will:
- Migrate all JSON data to Firestore
- Move local JSON files to backup folder

### 4. Set Admin Users

After users sign up, grant admin privileges:

```bash
node scripts/set-admin-user.js user@example.com
```

### 5. Production Firestore Rules

**IMPORTANT**: Before going to production, update `firestore.rules`:

Change line 19 from:
```javascript
return isAuthenticated(); // Development mode
```

To:
```javascript
return isAdmin(); // Production mode
```

Then redeploy:
```bash
npm run firebase:deploy-rules
```

### 6. Firebase Storage Setup (Optional)

If you plan to use Firebase Storage for file uploads:

1. Go to [Firebase Console > Storage](https://console.firebase.google.com/project/sportsfc-ddcec/storage)
2. Click "Get Started"
3. Deploy storage rules:
   ```bash
   firebase deploy --only storage:rules
   ```

### 7. Missing API Route

The `kidscamp/page.js` references `/api/register` which doesn't exist. You need to either:

**Option A**: Create the API route at `src/app/api/register/route.js`
**Option B**: Update `kidscamp/page.js` to use EmailJS or Firestore directly

### 8. Build and Test

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Check for errors
npm run lint
```

### 9. Deployment Checklist

- [ ] All environment variables set in deployment platform (Vercel, Netlify, etc.)
- [ ] Firebase project properly configured
- [ ] Firestore rules set to production mode (admin only)
- [ ] Admin users configured
- [ ] Data migrated to Firestore
- [ ] Storage rules deployed (if using Storage)
- [ ] Error tracking configured (optional: Sentry, LogRocket)
- [ ] Analytics configured (Firebase Analytics)
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Performance testing completed
- [ ] Security audit completed

## 🔒 Security Best Practices

1. **Never commit** `.env.local` or service account files
2. **Use environment variables** for all secrets
3. **Enable Firebase App Check** for additional security
4. **Set up Firebase Storage rules** if using file uploads
5. **Review Firestore rules** regularly
6. **Limit admin access** to trusted users only
7. **Enable Firebase Authentication** email verification
8. **Set up rate limiting** for API routes (if using)

## 📊 Monitoring

Consider setting up:
- Firebase Performance Monitoring
- Firebase Crashlytics
- Google Analytics
- Error tracking service (Sentry, LogRocket)

## 🚀 Deployment Platforms

### Vercel
- Set environment variables in project settings
- Automatic deployments on git push
- Built-in Next.js optimization

### Netlify
- Set environment variables in site settings
- Configure build command: `npm run build`
- Publish directory: `.next`

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## 📝 Notes

- Console.error statements are acceptable for production error logging
- All user-facing errors should show friendly messages
- Loading states are implemented throughout
- Error boundaries can be added for better error handling (optional)

