"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postFrog(url: string) {
  // Validate the URL shape
  const regex =
    /^https?:\/\/dc7\.getfrogs\.xyz\/necklace\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!regex.test(url)) {
    throw new Error("Invalid URL format");
  }
  const frog = await prisma.frog.create({
    data: {
      url,
    },
  });
  return frog;
}
