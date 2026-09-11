/*
  Warnings:

  - A unique constraint covering the columns `[project_id,parent_id,name]` on the table `folders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `project_id` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "folders_project_id_name_key";

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "project_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "depth" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "folders_project_id_parent_id_name_key" ON "folders"("project_id", "parent_id", "name");

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
