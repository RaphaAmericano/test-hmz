-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_user_id_fkey";

-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
