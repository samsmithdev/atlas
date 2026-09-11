-- AlterTable
ALTER TABLE "files" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "inbox_items" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "description" SET DEFAULT '';
