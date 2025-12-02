#!/bin/bash

# Auto-detect service account and run migration

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo "=========================================="
echo "  Auto Migration Script"
echo "=========================================="
echo ""

# Check multiple locations for service account
LOCATIONS=(
  "$PROJECT_DIR/firebase-credentials/serviceAccount.json"
  "$PROJECT_DIR/firebase-credentials/*.json"
  "$PROJECT_DIR/*serviceAccount*.json"
  "$PROJECT_DIR/*firebase-adminsdk*.json"
  "$HOME/Downloads/*sportsfc*.json"
  "$HOME/Downloads/*firebase*.json"
  "$HOME/Downloads/*serviceAccount*.json"
)

SERVICE_ACCOUNT_FILE=""

for location in "${LOCATIONS[@]}"; do
  # Expand glob patterns
  for file in $location; do
    if [ -f "$file" ] && [[ "$file" == *.json ]]; then
      # Validate it's a service account JSON
      if grep -q '"type":\s*"service_account"' "$file" 2>/dev/null && \
         grep -q '"project_id":\s*"sportsfc-ddcec"' "$file" 2>/dev/null; then
        SERVICE_ACCOUNT_FILE="$file"
        break 2
      fi
    fi
  done
done

if [ -z "$SERVICE_ACCOUNT_FILE" ]; then
  echo "⚠ Service account file not found!"
  echo ""
  echo "Please download it from:"
  echo "https://console.firebase.google.com/project/sportsfc-ddcec/settings/serviceaccounts/adminsdk"
  echo ""
  echo "And save it to one of these locations:"
  echo "  - $PROJECT_DIR/firebase-credentials/serviceAccount.json"
  echo "  - $PROJECT_DIR/"
  echo "  - $HOME/Downloads/"
  echo ""
  echo "Then run this script again."
  exit 1
fi

echo "✓ Found service account: $SERVICE_ACCOUNT_FILE"
export GOOGLE_APPLICATION_CREDENTIALS="$SERVICE_ACCOUNT_FILE"

# If it's not in firebase-credentials, suggest moving it
if [[ "$SERVICE_ACCOUNT_FILE" != "$PROJECT_DIR/firebase-credentials/"* ]]; then
  TARGET="$PROJECT_DIR/firebase-credentials/serviceAccount.json"
  mkdir -p "$PROJECT_DIR/firebase-credentials"
  if [ ! -f "$TARGET" ]; then
    cp "$SERVICE_ACCOUNT_FILE" "$TARGET"
    echo "✓ Copied to: $TARGET"
    export GOOGLE_APPLICATION_CREDENTIALS="$TARGET"
  fi
fi

echo ""
echo "=========================================="
echo "  Running Migration"
echo "=========================================="
echo ""

npm run seed:firebase

if [ $? -eq 0 ]; then
  echo ""
  echo "=========================================="
  echo "  ✓ Migration Complete!"
  echo "=========================================="
else
  echo ""
  echo "⚠ Migration failed. Please check the errors above."
  exit 1
fi
