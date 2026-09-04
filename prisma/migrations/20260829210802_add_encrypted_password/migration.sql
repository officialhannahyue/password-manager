/*
  Warnings:

  - You are about to drop the column `notes` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Credential` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "notes",
DROP COLUMN "password",
ADD COLUMN     "encryptedPassword" TEXT;
