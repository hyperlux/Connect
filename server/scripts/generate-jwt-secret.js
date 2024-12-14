import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate a secure random string for JWT secret
const secret = crypto.randomBytes(64).toString('hex');

// Path to .env file in root directory
const envPath = path.join(__dirname, '../../.env');

// Read existing .env content
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  // File doesn't exist, that's okay
}

// Check if JWT_SECRET already exists
if (envContent.includes('JWT_SECRET=')) {
  // Replace existing JWT_SECRET
  envContent = envContent.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${secret}`);
} else {
  // Add new JWT_SECRET
  envContent += `\nJWT_SECRET=${secret}`;
}

// Write back to .env file
fs.writeFileSync(envPath, envContent.trim() + '\n');

console.log('Generated JWT Secret:');
console.log(secret);
console.log('\nSecret has been saved to .env file');
