# AurovilleConnect

A community platform for Auroville residents to connect, share events, and collaborate.

## Features

- Event Management
- Community Forums
- City Services Directory
- Local Resources
- Community Decisions
- Interactive Map
- Bazaar Marketplace

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma
- Authentication: JWT
- UI: Tailwind CSS + Radix UI

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:hyperlux/AurovilleConnect.git
cd AurovilleConnect
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
# In the server directory
cp .env.example .env
# Edit .env with your database and SMTP credentials
```

4. Set up the database:
```bash
cd server
npx prisma migrate deploy
```

5. Start the development servers:
```bash
# Start the backend server (in the server directory)
npm run dev

# Start the frontend development server (in the root directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 