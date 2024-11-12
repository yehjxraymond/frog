"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function fetchFrogs() {
  const frogs = await prisma.frog.findMany();
  return frogs;
}
