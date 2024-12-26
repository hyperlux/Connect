import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

  try {
    console.log('Testing database connection...')
    console.log('Database URL:', process.env.DATABASE_URL)
    
    const result = await prisma.$queryRaw`SELECT current_user, current_database()`
    console.log('Connection successful!')
    console.log('Current user:', result[0].current_user)
    console.log('Current database:', result[0].current_database)
  } catch (error) {
    console.error('Connection failed:', error)
    console.error('Error details:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()