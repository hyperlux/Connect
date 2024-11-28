#!/bin/bash

# Exit on error
set -e

echo "Starting server setup..."

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
npm install -g pm2
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
NODE_ENV=production
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

# Build frontend
echo "Building frontend..."
npm run build

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

# Start services with PM2
echo "Starting services..."
pm2 start index.js --name auroville-server
cd ..
pm2 serve dist 5173 --name auroville-client --spa

# Save PM2 process list
echo "Saving PM2 process list..."
pm2 save

# Setup PM2 startup script
echo "Setting up PM2 startup..."
pm2 startup

echo "Setup completed successfully!"
echo "Please update the environment variables in .env and server/.env with your production values." 