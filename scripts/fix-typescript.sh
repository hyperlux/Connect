 #!/bin/sh

# Install required type declarations
npm install --save-dev @types/react @types/react-dom @types/node @types/react-router-dom @types/date-fns

# Create a types directory if it doesn't exist
mkdir -p src/@types

# Create custom type declarations for modules without types
cat > src/@types/custom.d.ts << 'EOF'
declare module 'lucide-react';
declare module 'zustand';
declare module 'zustand/middleware';
declare module 'react-hook-form';
declare module '@tanstack/react-query';

// Add JSX support
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
EOF

# Update tsconfig.json to include proper configuration
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "allowJs": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "types": ["vite/client", "node"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Create tsconfig.node.json if it doesn't exist
cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

# Remove unused React imports
find src -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  # Check if the file contains 'import React' but doesn't use React
  if grep -q 'import React from "react"' "$file" && ! grep -q 'React\.' "$file" && ! grep -q '<React\.' "$file"; then
    echo "Removing unused React import from $file"
    sed -i 's/import React from "react";//g' "$file"
    sed -i '/^import React from "react"$/d' "$file"
  fi
done

# Fix SearchResult export
if grep -q "interface SearchResult" "src/lib/search.ts"; then
  echo "Fixing SearchResult export in src/lib/search.ts"
  sed -i 's/interface SearchResult/export interface SearchResult/' "src/lib/search.ts"
fi

# Fix ForumState interface
if grep -q "interface ForumState" "src/lib/forum.ts"; then
  echo "Adding missing properties to ForumState"
  sed -i 's/interface ForumState {/interface ForumState {\n  currentPage: number;\n  postsPerPage: number;\n  totalPosts: number;\n  sortBy: "newest" | "popular" | "active";\n  searchQuery: string;\n  filters: {\n    timeRange: "all" | "today" | "week" | "month";\n    status: "all" | "open" | "closed";\n  };/' "src/lib/forum.ts"
fi

# Fix Event interface
if grep -q "interface Event" "src/pages/Events/components/EventDetails.tsx"; then
  echo "Fixing Event interface"
  sed -i 's/interface Event {/export interface Event {\n  id: string;\n  title: string;\n  date: string;\n  time: string;\n  endTime: string;\n  attendees: number;\n  maxSpots: number;\n  description?: string;\n  location?: string;/' "src/pages/Events/components/EventDetails.tsx"
fi