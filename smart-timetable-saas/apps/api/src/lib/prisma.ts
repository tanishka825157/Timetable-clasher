import { PrismaPg } from '@prisma/adapter-pg'
import { z } from 'zod'
import { PrismaClient } from '../generated/prisma/client.js'

const databaseUrl = z.url().parse(process.env.DATABASE_URL)
const adapter = new PrismaPg({ connectionString: databaseUrl })

export const prisma = new PrismaClient({ adapter })
