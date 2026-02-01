-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "shortcode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subjectId" TEXT,
    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable


CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "content" JSONB NOT NULL DEFAULT '[]',
    "fts_vector" tsvector,
    "semantic_vector" vector(768),
    "projectId" TEXT,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "files_fts_vector_idx" ON "files" USING GIN ("fts_vector");

-- AddForeignKey
ALTER TABLE "projects"
ADD CONSTRAINT "projects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files"
ADD CONSTRAINT "files_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 3. Create a function to extract text from Tiptap JSON
-- Tiptap stores text in "text" keys nested inside "content" arrays.
-- This basic function grabs all value of "text" keys recursively.
CREATE OR REPLACE FUNCTION extract_tiptap_text(data jsonb) RETURNS text AS $$
BEGIN
    RETURN (
        WITH RECURSIVE doc_tree AS (
            SELECT data AS elem
            UNION ALL
            SELECT jsonb_array_elements(elem->'content')
            FROM doc_tree
            WHERE jsonb_typeof(elem->'content') = 'array'
        )
        SELECT string_agg(elem->>'text', ' ')
        FROM doc_tree
        WHERE elem ? 'text'
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 4. Create the Trigger to auto-update the search vector
CREATE OR REPLACE FUNCTION files_tsvector_trigger() RETURNS trigger AS $$
BEGIN
  -- Convert the extracted text into a searchable vector
  NEW.fts_vector := to_tsvector('english', coalesce(NEW.name, '') || ' ' || coalesce(NEW.description, '') || ' ' || coalesce(extract_tiptap_text(NEW.content)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON "files" FOR EACH ROW EXECUTE PROCEDURE files_tsvector_trigger();

-- 5. Add Indices
CREATE INDEX files_search_idx ON "files" USING GIN (fts_vector);
-- Create the vector index for AI search (IVFFlat is good for speed)
CREATE INDEX files_semantic_idx ON "files" USING ivfflat (
    semantic_vector vector_cosine_ops
);