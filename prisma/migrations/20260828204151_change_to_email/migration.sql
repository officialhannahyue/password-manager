/*
  Warnings:

  - You are about to drop the column `username` on the `Credential` table. All the data in the column will be lost.
  - Added the required column `email` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;
