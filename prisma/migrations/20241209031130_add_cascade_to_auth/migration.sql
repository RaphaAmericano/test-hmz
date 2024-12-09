/*
  Warnings:

  - Made the column `user_id` on table `Auth` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_user_id_fkey";

-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
