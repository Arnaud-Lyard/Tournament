/*
  Warnings:

  - Added the required column `slug` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;
