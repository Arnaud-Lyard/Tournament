/*
  Warnings:

  - You are about to drop the column `pseudo` on the `user` table. All the data in the column will be lost.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "pseudo",
ADD COLUMN     "username" VARCHAR(255) NOT NULL;
