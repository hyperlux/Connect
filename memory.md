# Development Memory

[Previous content through "TypeScript Configuration and Common Issues" section remains unchanged...]

### TypeScript Configuration and Common Issues

1. Required Dependencies:
   ```bash
   # Core TypeScript dependencies
   npm install --save-dev typescript @types/react @types/react-dom

   # Check versions are installed
   npm list typescript @types/react @types/react-dom
   ```

2. TypeScript Configuration:
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "target": "ES2020",
       "useDefineForClassFields": true,
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "module": "ESNext",
       "skipLibCheck": true,
       "allowJs": true,
       "moduleResolution": "bundler",
       "allowImportingTsExtensions": true,
       "resolveJsonModule": true,
       "isolatedModules": true,
       "noEmit": true,
       "jsx": "react-jsx",
       "esModuleInterop": true,
       "strict": true,
       "noUnusedLocals": false,
       "noUnusedParameters": false,
       "typeRoots": ["./node_modules/@types", "./src/types"],
       "types": ["react", "react-dom", "vite/client"]
     },
     "include": ["src"],
     "references": [{ "path": "./tsconfig.node.json" }]
   }
   ```

3. Common TypeScript Issues:
   - JSX namespace missing: Import React in files using JSX
   - Missing type definitions: Install @types packages
   - Implicit any types: Use proper type annotations
   - JSX.IntrinsicElements errors: Ensure proper React types
   - React hooks type errors: Ensure proper React type declarations in vite-env.d.ts

4. Type Declaration Files:
   ```typescript
   // vite-env.d.ts
   /// <reference types="vite/client" />
   /// <reference types="react" />
   /// <reference types="react-dom" />

   // File type declarations
   declare module '*.svg' {
     import * as React from 'react';
     const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
     export default ReactComponent;
   }

   // React namespace augmentation
   declare namespace React {
     export import useState = React.useState;
     export import useEffect = React.useEffect;
     export import useCallback = React.useCallback;
     export import useMemo = React.useMemo;
     export import useRef = React.useRef;
     
     interface FormEvent<T = Element> extends SyntheticEvent<T> {
       readonly target: EventTarget & T;
     }
     
     interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
       readonly target: EventTarget & T;
     }
   }

   // JSX type declarations (jsx.d.ts)
   declare global {
     namespace JSX {
       interface IntrinsicElements {
         div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
         // ... other element definitions
       }
       interface Element extends React.ReactElement<any, any> { }
       interface ElementClass extends React.Component<any> { }
     }
   }
   ```

5. Build Issues Solutions:
   - Disable strict unused checks if causing false positives:
     ```json
     "noUnusedLocals": false,
     "noUnusedParameters": false
     ```
   - Add proper type roots configuration:
     ```json
     "typeRoots": ["./node_modules/@types", "./src/types"]
     ```
   - Include necessary type references:
     ```typescript
     /// <reference types="vite/client" />
     /// <reference types="react" />
     /// <reference types="react-dom" />
     ```
   - Augment React namespace for hooks:
     ```typescript
     declare namespace React {
       export import useState = React.useState;
       export import useEffect = React.useEffect;
       // ... other hooks
     }
     ```

6. Development Best Practices:
   ```bash
   # Check for type errors before commit
   tsc --noEmit

   # Update all @types packages
   npm update @types/*
   ```

7. IDE Configuration:
   - Use VS Code with TypeScript support
   - Enable "TypeScript > Suggest: Enabled" setting
   - Install ESLint and Prettier extensions

8. Pre-commit Checks:
   ```bash
   # Add to package.json scripts
   "scripts": {
     "typecheck": "tsc --noEmit",
     "lint": "eslint src --ext .ts,.tsx"
   }
   ```

9. Troubleshooting Steps:
   - Clear TypeScript cache: `rm -rf node_modules/.cache/typescript`
   - Rebuild node_modules: `rm -rf node_modules && npm install`
   - Update TypeScript: `npm install typescript@latest`
   - Check tsconfig paths match project structure
   - Verify type declarations in vite-env.d.ts and jsx.d.ts
   - Ensure React namespace augmentations are properly defined

[Previous "Production Server Details" and other sections remain unchanged...]
