import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const payload = {
  userId: 'some-user-id',
  email: 'test@example.com',
  role: 'USER'
};

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error('JWT_SECRET is not defined in the environment.');
  process.exit(1);
}

const token = jwt.sign(payload, secret, { expiresIn: '24h' });

console.log('Generated JWT:', token);