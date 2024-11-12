'use server'

export const dynamic = 'force-dynamic'
export const revalidate = 60

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function fetchFrogs() {
  try {
    const frogs = await prisma.frog.findMany()
    return frogs
  } catch (error) {
    throw new Error('Error fetching URLs from the database')
  }
} 