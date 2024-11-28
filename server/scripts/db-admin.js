import pg from 'pg';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const { Pool } = pg;
const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/auroville'
});

async function createAdmin() {
  const client = await pool.connect();
  
  try {
    const email = 'polletkiro@gmail.com';
    const password = 'Admin123!';
    const name = 'Admin User';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Delete existing user if any
    await client.query('DELETE FROM "User" WHERE email = $1', [email]);
    
    // Create new admin user
    const result = await client.query(
      'INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
      [
        '00000000-0000-0000-0000-000000000000',
        email,
        hashedPassword,
        name,
        'ADMIN'
      ]
    );
    
    console.log('Created admin user:', result.rows[0]);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

createAdmin(); 