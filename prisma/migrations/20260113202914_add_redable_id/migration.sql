/*
  Warnings:

  - A unique constraint covering the columns `[readableId]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[readableId]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortcode]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `readableId` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readableId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "readableId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "fileSequence" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "readableId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "projectSequence" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "files_readableId_key" ON "files"("readableId");

-- CreateIndex
CREATE UNIQUE INDEX "projects_readableId_key" ON "projects"("readableId");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_shortcode_key" ON "subjects"("shortcode");
