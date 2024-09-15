-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "PostStatusEnumType" AS ENUM ('draft', 'published', 'disabled');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "mail_subscription" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" DEFAULT 'user',
    "notification" BOOLEAN NOT NULL DEFAULT false,
    "avatar" VARCHAR(255) DEFAULT 'user.png',
    "verification_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "password_reset_token" TEXT,
    "password_reset_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "french_title" VARCHAR(255) NOT NULL,
    "english_title" VARCHAR(255) NOT NULL,
    "french_description" TEXT NOT NULL,
    "english_description" TEXT NOT NULL,
    "french_content" TEXT NOT NULL,
    "english_content" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "status" "PostStatusEnumType" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author_id" UUID NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_on_users" (
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "posts_on_users_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_on_posts" (
    "post_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "categories_on_posts_pkey" PRIMARY KEY ("post_id","category_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "parent_id" UUID,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_verification_code_key" ON "user"("verification_code");

-- CreateIndex
CREATE INDEX "user_email_verification_code_password_reset_token_idx" ON "user"("email", "verification_code", "password_reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_verification_code_password_reset_token_key" ON "user"("email", "verification_code", "password_reset_token");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_on_users" ADD CONSTRAINT "posts_on_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_on_users" ADD CONSTRAINT "posts_on_users_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_posts" ADD CONSTRAINT "categories_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_posts" ADD CONSTRAINT "categories_on_posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
