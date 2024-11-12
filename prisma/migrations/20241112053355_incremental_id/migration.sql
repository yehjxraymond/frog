/*
  Warnings:

  - The primary key for the `Frog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Frog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Frog" DROP CONSTRAINT "Frog_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Frog_pkey" PRIMARY KEY ("id");
