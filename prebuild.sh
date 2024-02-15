#!/bin/bash

# Step 1: Run Expo prebuild
npx expo prebuild --platform android

# Step 2: Insert 'pickFirst "**/libcrypto.so"' into the android/app/build.gradle file
BUILD_GRADLE_PATH="./android/app/build.gradle"
PICK_FIRST_LINE="pickFirst '**/libcrypto.so'"

# Check if the line already exists to avoid duplicates
if ! grep -q "$PICK_FIRST_LINE" "$BUILD_GRADLE_PATH"; then
  # Use awk to insert the line after the packagingOptions block starts
  awk -v line="$PICK_FIRST_LINE" '/packagingOptions {/{print; print "                " line; next}1' "$BUILD_GRADLE_PATH" > temp.gradle
  mv temp.gradle "$BUILD_GRADLE_PATH"
  echo "Inserted 'pickFirst \"**/libcrypto.so\"' into $BUILD_GRADLE_PATH"
else
  echo "'pickFirst \"**/libcrypto.so\"' already exists in $BUILD_GRADLE_PATH"
fi
