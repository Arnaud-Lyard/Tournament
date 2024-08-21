/*
  Warnings:

  - Added the required column `english_description` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `french_description` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "english_description" TEXT NOT NULL,
ADD COLUMN     "french_description" TEXT NOT NULL;
