# Auroville Connect Project File Roles

## High-Level Directories

1. **server/**: This directory contains the backend server code for the Auroville Connect application. It includes the following key files and subdirectories:
   - `index.js`: The main entry point for the backend server.
   - `nodemon.json`: Configuration file for the Nodemon development server.
   - `package.json` and `package-lock.json`: Manage the server-side dependencies.
   - `config/`: Contains environment-specific configuration files for the server.
   - `lib/`: Includes utility modules for interacting with the database, sending emails, logging, and more.
   - `middleware/`: Defines middleware functions for authentication, error handling, and other server-side logic.
   - `prisma/`: Contains the Prisma schema and migration files, which define and manage the database schema.
   - `routes/`: Defines the API routes for handling user authentication, events, forums, notifications, and other functionality.
   - `scripts/`: Includes various scripts for managing the database, creating test data, and other server-side tasks.
   - `uploads/`: Stores user profile picture uploads.

2. **src/**: This directory contains the frontend code for the Auroville Connect application, built using React. It includes the following key files and subdirectories:
   - `App.tsx`: The main React component that serves as the entry point for the frontend.
   - `index.html`: The main HTML file that serves as the template for the application.
   - `index.css` and `index.tsx`: The main CSS and TypeScript entry points.
   - `components/`: Contains reusable React components, such as the header, sidebar, login/registration forms, and more.
   - `lib/`: Includes utility modules for handling authentication, routing, theming, and other frontend-specific functionality.
   - `pages/`: Defines the main pages of the application, such as the dashboard, forums, services, and user profiles.
   - `theme/`: Contains the application's theme-related files and configurations.
   - `types/`: Defines the TypeScript types used throughout the frontend codebase.

3. **public/**: This directory contains the static assets used by the frontend, such as images, fonts, and the main HTML file (`index.html`).

4. **prisma/**: This directory contains the Prisma schema and migration files, which define the database schema and manage database changes.

5. **config files**: The project includes various configuration files, such as `package.json`, `tsconfig.json`, `vite.config.ts`, and others, which define the project's dependencies, build settings, and other global configurations.

6. **deployment files**: The project includes files related to deployment, such as `Dockerfile`, `docker-compose.yml`, `ecosystem.config.js`, and various shell scripts for managing the deployment process.

## Detailed File Descriptions

### Server Directory

- `index.js`: The main entry point for the backend server. It sets up the Express.js server, connects to the database, and mounts the various API routes.
- `nodemon.json`: Configuration file for the Nodemon development server, which automatically restarts the server when changes are detected.
- `package.json` and `package-lock.json`: Manage the server-side dependencies, including Express.js, Prisma, and other libraries.
- `config/`: Contains environment-specific configuration files for the server, such as database connection details and other sensitive information.
- `lib/`: Includes utility modules for interacting with the database (`db.js`), sending emails (`email.js`), logging (`log.js`), managing notifications (`notifications.js`), and working with Prisma (`prisma.js`).
- `middleware/`: Defines middleware functions for authentication (`authenticate.js`), admin access control (`admin.js`), and error handling (`errorHandler.js`).
- `prisma/`: Contains the Prisma schema (`schema.prisma`) and migration files, which define and manage the database schema.
- `routes/`: Defines the API routes for handling user authentication (`auth.mjs`), events (`events.js`), forums (`forums.js`), notifications (`notifications.js`), services (`services.js`), and users (`users.js`).
- `scripts/`: Includes various scripts for managing the database, creating test data, and other server-side tasks, such as creating admin users, generating JWT secrets, and more.
- `uploads/`: Stores user profile picture uploads.

### Frontend Directory

- `App.tsx`: The main React component that serves as the entry point for the frontend application.
- `index.html`: The main HTML file that serves as the template for the application.
- `index.css` and `index.tsx`: The main CSS and TypeScript entry points for the frontend.
- `components/`: Contains reusable React components, such as the header (`Header.tsx`), sidebar (`Sidebar.tsx`), login/registration forms (`LoginForm.tsx`, `SignupForm.tsx`), and more.
- `lib/`: Includes utility modules for handling authentication (`auth.ts`, `auth.tsx`), routing (`router.ts`), theming (`theme.tsx`), and other frontend-specific functionality.
- `pages/`: Defines the main pages of the application, such as the dashboard (`Dashboard.tsx`), forums (`Forums.tsx`), services (`Services.tsx`), user profiles (`Profile.tsx`), and more.
- `theme/`: Contains the application's theme-related files and configurations.
- `types/`: Defines the TypeScript types used throughout the frontend codebase.

### Other Files and Directories

- **public/**: Contains the static assets used by the frontend, such as images, fonts, and the main HTML file (`index.html`).
- **prisma/**: Contains the Prisma schema (`schema.prisma`) and migration files, which define and manage the database schema.
- **config files**: The project includes various configuration files, such as `package.json`, `tsconfig.json`, `vite.config.ts`, and others, which define the project's dependencies, build settings, and other global configurations.
- **deployment files**: The project includes files related to deployment, such as `Dockerfile`, `docker-compose.yml`, `ecosystem.config.js`, and various shell scripts for managing the deployment process.
