/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_username_key" ON "Auth"("username");
