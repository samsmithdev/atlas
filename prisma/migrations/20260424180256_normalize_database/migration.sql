/*
  Warnings:

  - You are about to drop the column `project_id` on the `files` table. All the data in the column will be lost.
  - Made the column `folder_id` on table `files` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_folder_id_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_project_id_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "project_id",
ALTER COLUMN "folder_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "isRoot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parent_id" TEXT;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
