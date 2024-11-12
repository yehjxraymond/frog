"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postFrog(url: string) {
  // Update the regex to also match the new URL format
  const regex =
    /^(https?:\/\/)?(dc7\.getfrogs\.xyz\/necklace\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|zupass\.org\/#\/\?necklace_qr=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}&folder=frogcrypto|frogcrypto\.vercel\.app\/\?necklace_qr=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
  if (!regex.test(url)) {
    throw new Error("Invalid URL format");
  }
  // Extract UUID from both URL formats and standardize to dc7.getfrogs.xyz format
  let formattedUrl = url;
  const uuidMatch = url.match(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  );
  if (uuidMatch) {
    formattedUrl = `https://dc7.getfrogs.xyz/necklace/${uuidMatch[0]}`;
  }
  const frog = await prisma.frog.create({
    data: {
      url: formattedUrl,
    },
  });
  return frog;
}
