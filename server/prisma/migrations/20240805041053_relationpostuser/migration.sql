/*
  Warnings:

  - You are about to drop the column `englishTitle` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `frenchTitle` on the `post` table. All the data in the column will be lost.
  - Added the required column `english_title` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `french_title` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "englishTitle",
DROP COLUMN "frenchTitle",
ADD COLUMN     "english_title" VARCHAR(255) NOT NULL,
ADD COLUMN     "french_title" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "posts_on_users" (
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "posts_on_users_pkey" PRIMARY KEY ("user_id","post_id")
);

-- AddForeignKey
ALTER TABLE "posts_on_users" ADD CONSTRAINT "posts_on_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_on_users" ADD CONSTRAINT "posts_on_users_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
