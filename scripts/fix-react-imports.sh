#!/bin/bash

# Find all TypeScript/TSX files
find src -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  # Check if the file contains 'import React from "react"' but doesn't use React
  if grep -q 'import React from "react"' "$file" && ! grep -q 'React\.' "$file" && ! grep -q '<React\.' "$file"; then
    echo "Removing unused React import from $file"
    sed -i '' 's/import React from "react";//g' "$file"
    sed -i '' '/^import React from "react"$/d' "$file"
  fi
done 