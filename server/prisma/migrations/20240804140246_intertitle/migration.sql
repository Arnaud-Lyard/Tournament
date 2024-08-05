/*
  Warnings:

  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - Added the required column `englishTitle` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frenchTitle` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "title",
ADD COLUMN     "englishTitle" VARCHAR(255) NOT NULL,
ADD COLUMN     "frenchTitle" VARCHAR(255) NOT NULL;
