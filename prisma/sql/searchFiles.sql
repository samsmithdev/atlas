SELECT 
  id, 
  name, 
  -- Highlight the matching word in the results
  ts_headline('english', extract_tiptap_text(content), plainto_tsquery($1)) as snippet
FROM "files"
WHERE fts_vector @@ plainto_tsquery($1)
ORDER BY ts_rank(fts_vector, plainto_tsquery($1)) DESC;