import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate a secure random string for JWT secret
const secret = crypto.randomBytes(32).toString('hex');

// Validate the secret
if (!/^[0-9a-f]{64}$/.test(secret)) {
    console.error('Generated secret is not in the expected format');
    process.exit(1);
}

// Path to .env file in root directory
const envPath = path.join(__dirname, '../../.env');

// Read existing .env content
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
    // File doesn't exist, that's okay
}

// Split into lines and process
const lines = envContent.split('\n').filter(line => line.trim());
const newLines = [];
let secretAdded = false;

// Process each line
for (const line of lines) {
    if (line.startsWith('JWT_SECRET=')) {
        newLines.push(`JWT_SECRET=${secret}`);
        secretAdded = true;
    } else {
        newLines.push(line);
    }
}

// Add secret if it wasn't found
if (!secretAdded) {
    newLines.push(`JWT_SECRET=${secret}`);
}

// Join lines and write back to file
fs.writeFileSync(envPath, newLines.join('\n') + '\n');

console.log('Generated JWT Secret:');
console.log(secret);
console.log('\nSecret has been saved to .env file');
