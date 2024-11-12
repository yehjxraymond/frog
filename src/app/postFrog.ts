"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postFrog(url: string) {
  // Validate the URL shape
  const regex =
    /^http:\/\/dc7\.getfrogs\.xyz\/necklace\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!regex.test(url)) {
    throw new Error("Invalid URL format");
  }
  // Check for duplicates and add to the database if unique
  try {
    const frog = await prisma.frog.create({
      data: {
        url,
      },
    });
    return frog;
  } catch (error) {
    throw new Error("Error adding URL to the database");
  }
}
