/*
  Warnings:

  - Added the required column `vote` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "vote" INTEGER NOT NULL;
