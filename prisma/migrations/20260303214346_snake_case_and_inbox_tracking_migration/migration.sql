/*
  Warnings:

  - You are about to drop the column `altText` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `blurHash` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `inboxItemId` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `readableId` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `inbox_items` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `inbox_items` table. All the data in the column will be lost.
  - You are about to drop the column `fileSequence` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `readableId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `projectSequence` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `subjects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[readable_id]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_id,name]` on the table `folders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[readable_id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mime_type` to the `assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readable_id` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `folders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `folders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `inbox_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readable_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InboxAction" AS ENUM ('APPENDED', 'CREATED_NEW', 'DELETED');

-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_fileId_fkey";

-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_inboxItemId_fkey";

-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_userId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_folderId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_userId_fkey";

-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_projectId_fkey";

-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_userId_fkey";

-- DropForeignKey
ALTER TABLE "inbox_items" DROP CONSTRAINT "inbox_items_userId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_userId_fkey";

-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_userId_fkey";

-- DropIndex
DROP INDEX "files_readableId_key";

-- DropIndex
DROP INDEX "folders_projectId_name_key";

-- DropIndex
DROP INDEX "projects_readableId_key";

-- AlterTable
ALTER TABLE "assets" DROP COLUMN "altText",
DROP COLUMN "blurHash",
DROP COLUMN "createdAt",
DROP COLUMN "fileId",
DROP COLUMN "inboxItemId",
DROP COLUMN "mimeType",
DROP COLUMN "userId",
ADD COLUMN     "alt_text" TEXT,
ADD COLUMN     "blur_hash" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "file_id" TEXT,
ADD COLUMN     "inbox_item_id" TEXT,
ADD COLUMN     "mime_type" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "files" DROP COLUMN "folderId",
DROP COLUMN "readableId",
DROP COLUMN "userId",
ADD COLUMN     "folder_id" TEXT,
ADD COLUMN     "readable_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "createdAt",
DROP COLUMN "projectId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "inbox_items" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "action_taken" "InboxAction",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resolved_file_id" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "fileSequence",
DROP COLUMN "readableId",
DROP COLUMN "subjectId",
DROP COLUMN "userId",
ADD COLUMN     "file_sequence" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "readable_id" TEXT NOT NULL,
ADD COLUMN     "subject_id" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "projectSequence",
DROP COLUMN "userId",
ADD COLUMN     "project_sequence" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "files_readable_id_key" ON "files"("readable_id");

-- CreateIndex
CREATE UNIQUE INDEX "folders_project_id_name_key" ON "folders"("project_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_readable_id_key" ON "projects"("readable_id");

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_items" ADD CONSTRAINT "inbox_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_items" ADD CONSTRAINT "inbox_items_resolved_file_id_fkey" FOREIGN KEY ("resolved_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_inbox_item_id_fkey" FOREIGN KEY ("inbox_item_id") REFERENCES "inbox_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
