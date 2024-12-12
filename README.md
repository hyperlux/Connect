# Auroville Connect

A community platform for Auroville residents to connect, share information, and engage in discussions.

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
  - Event management
  - City services directory
  - Notifications system
  - User profiles

## Tech Stack

- **Frontend**
  - React with TypeScript
  - Vite for build tooling
  - TailwindCSS for styling
  - React Router for navigation

- **Backend**
  - Node.js with Express
  - PostgreSQL database
  - Prisma ORM
  - JWT for authentication
  - Nodemailer for emails

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auroville-connect.git
cd auroville-connect
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
```bash
# In root directory
cp .env.example .env

# In server directory
cd server
cp .env.example .env
```

4. Set up the database:
```bash
cd server
npx prisma migrate dev
```

5. Start the development servers:
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend development server (from root directory)
npm run dev
```

The application should now be running at `http://localhost:5173` with the API server at `http://localhost:5000`.

## Project Structure

```
auroville-connect/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions and API clients
│   └── types/             # TypeScript type definitions
├── server/                 # Backend source code
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── lib/              # Backend utilities
│   └── prisma/           # Database schema and migrations
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Auroville community for inspiration and support
- All contributors who have helped shape this project
