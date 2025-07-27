#!/bin/bash

# CSS files that are missing (excluding dashboard/internal related)
CSS_FILES=(
  "integrated-fixes.css"
  "targeted-fixes.css"
  "premium-scroll-effects-optimized.css"
  "page-specific.css"
  "performance-optimizations.css"
  "form-controls.css"
  "modern-background.css"
  "modern-cards.css"
  "premium-scroll-effects.css"
  "table-optimizations.css"
  "top-navigation.css"
)

for file in "${CSS_FILES[@]}"; do
  echo "Copying $file..."
  git show origin/v7.2:src/app/$file > src/app/$file 2>/dev/null || echo "Failed to copy $file"
done

echo "Done copying CSS files."