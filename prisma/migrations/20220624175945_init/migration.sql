/*
  Warnings:

  - You are about to drop the column `created_by` on the `Video` table. All the data in the column will be lost.
  - Added the required column `created_by_id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_created_by_fkey";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "created_by",
ADD COLUMN     "created_by_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
