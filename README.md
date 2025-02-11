# Auroville Connect

A community platform for Auroville residents to connect, share information, and engage in discussions.

![Auroville Connect Dashboard](dashboard.png)
*The Auroville Connect dashboard showing community events, announcements, and forum posts*

## Features

- **Forum System**
  - Create and view posts
  - Comment on posts
  - Vote on posts and comments
  - Sort posts by hot, top, and new
  - View individual post details
  - Track post views

- **User Authentication**
  - Email-based registration
  - JWT authentication
  - Role-based access control
  - Password reset functionality
  - Email verification

- **Community Features**
  - Weekly events calendar
  - City services directory
  - Notifications system
  - User profiles

## Tech Stack

- **Frontend**
  - React with TypeScript
  - Vite for build tooling
  - TailwindCSS for styling
  - React Router for navigation
  - Zustand for state management

- **Backend**
  - Node.js with Express
  - PostgreSQL database
  - Prisma ORM
  - JWT for authentication
  - Nodemailer for emails

## Development Setup

### Prerequisites

- Node.js (version 16 or later)
- npm
- Supabase Account

### Supabase Setup

1. Create a new Supabase project at [Supabase](https://supabase.com/)
2. Go to Project Settings > API
3. Copy your Project URL and Anon Key
4. Rename `.env.example` to `.env`
5. Fill in your Supabase credentials in the `.env` file
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Authentication

This project uses Supabase for authentication. Key methods are implemented in `src/lib/auth.tsx`:
- `signUp`: Register a new user
- `signIn`: Authenticate an existing user
- `signOut`: Log out the current user

### Database and Realtime

Supabase is integrated to provide:
- Authentication
- Database operations
- Realtime subscriptions

To use Supabase in your components:
```typescript
import { supabase } from './lib/supabase';

// Example: Fetching data
const fetchData = async () => {
  const { data, error } = await supabase
    .from('your_table')
    .select('*');
}

// Example: Realtime subscription
const subscribeToChanges = () => {
  supabase
    .from('your_table')
    .on('*', payload => {
      console.log('Change received!', payload);
    })
    .subscribe();
}
```

### Development

1. Install dependencies
   ```
   npm install
   ```

2. Start the development server
   ```
   npm run dev
   ```

### Deployment

Ensure all environment variables are set in your deployment platform.
