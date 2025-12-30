# /projects

Description: Project Editor w/o Project

## layout.tsx

Fetches projects (implement fetchProjectsForMenu() - DONE) and passes them to AtlasToolbar (developed - added fetchProjectsForMenu to it) .

## page.tsx

Displays the AtlasFullpageProjectNavigator (needs implemented, will fetch projects itself)

### AtlasFullpageProjectNavigator

3 Columns
Columns 1 + 2: evenly split projects under Subject header
Column 3: Project Preview (Name, Description) and Open button

#### Work Notes

Need to make a /project-preview endpoint?

# `/projects/[projectId]/files`

## layout.tsx

Displays the AtlasProjectFileNavigator (1/3 width) and passes the projectId to it so it can fetch the files

### AtlasProjectFileNavigator

Accepts projectId: string

Fetches files for projectId

Toolbar at top
- New file
- New folder 

Scrolling list of files
- li, a references to `/projects/${projectId}/files/${fileId}`, shows file name without ID

## page.tsx

Empty file pane

# `/projects/[projectId]/files/[fileId]`

## page.tsx

Passes fileId to AtlasMarkdownEditor (developed)