import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// 1. Create a standard Postgres connection pool
const connectionString = process.env.DATABASE_URL

const pool = new Pool({ connectionString })

// 2. Create the Adapter (The translation layer)
// This tells Prisma: "Use this pool to talk to the DB"
const adapter = new PrismaPg(pool)

// 3. Instantiate Prisma with the adapter
const prisma = new PrismaClient({ adapter })

export default prisma