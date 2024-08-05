/*
  Warnings:

  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - Added the required column `english_content` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `french_content` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "content",
ADD COLUMN     "english_content" TEXT NOT NULL,
ADD COLUMN     "french_content" TEXT NOT NULL;
