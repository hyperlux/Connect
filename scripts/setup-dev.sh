#!/bin/bash

# Exit on error
set -e

echo "Starting development setup..."

# Update package list
echo "Updating package list..."
apt-get update

# Install PostgreSQL
echo "Installing PostgreSQL..."
apt-get install -y postgresql postgresql-contrib

# Start PostgreSQL service
echo "Starting PostgreSQL service..."
systemctl start postgresql
systemctl enable postgresql

# Install Node.js and npm if not installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Install global dependencies
echo "Installing global dependencies..."
npm install -g prisma

# Setup PostgreSQL
echo "Setting up PostgreSQL..."
sudo -u postgres psql -c "CREATE DATABASE auroville;"
sudo -u postgres psql -c "CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE auroville TO postgres;"

# Clone repository if not exists
if [ ! -d "AurovilleConnect" ]; then
  echo "Cloning repository..."
  git clone https://github.com/hyperlux/AurovilleConnect.git
  cd AurovilleConnect
else
  cd AurovilleConnect
  git pull origin main
fi

# Create environment files
echo "Setting up environment files..."
cat > .env << EOL
VITE_API_URL=http://localhost:5000
VITE_APP_URL=http://localhost:5173
NODE_ENV=development
EOL

cat > server/.env << EOL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auroville"
JWT_SECRET="72jmcBa8LYTi7szZp1Lw9+GmKuEXp76og8B1FyySqOg8f3a5d2e1c4b7"
PORT=5000
SMTP_SERVER=smtp.ionos.com
SMTP_PORT=587
SMTP_USERNAME=notifications@aurovillenetwork.us
SMTP_PASSWORD=your_smtp_password
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000
EOL

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install

# Setup database
echo "Setting up database..."
npx prisma generate
npx prisma migrate deploy

# Create admin user
echo "Creating admin user..."
node scripts/create-admin.js polletkiro@gmail.com "Admin User" "Admin123!"

# Start development servers
echo "Starting development servers..."
echo "Starting backend server..."
cd server && npm run dev &
echo "Starting frontend server..."
cd .. && npm run dev &

echo "Setup completed successfully!"
echo "Your development servers are running:"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
echo "Press Ctrl+C to stop the servers"

# Wait for both servers
wait 