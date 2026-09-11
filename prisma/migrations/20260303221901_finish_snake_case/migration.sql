/*
  Warnings:

  - You are about to drop the column `projectId` on the `files` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_projectId_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "projectId",
ADD COLUMN     "project_id" TEXT;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
