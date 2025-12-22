-- DropIndex
DROP INDEX "files_semantic_idx";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "semantic_vector" vector(768);