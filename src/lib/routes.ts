const buildUrl = (path: string, query?: Record<string, string>) => {
  if (!query) return path;
  const params = new URLSearchParams(query);
  return `${path}?${params.toString()}`;
};

export const AppRoutes = {
  // Static Routes
  home: () => "/",
  indox: () => "/projects/inbox",

  // Dynamic Routes
  projectEditor: () => "/projects",
  project: (projectId: string) => `/projects/${projectId}`,
  projectFiles: (projectId: string) => `/projects/${projectId}/files`,
  file: (projectId: string, fileId: string) =>
    `/projects/${projectId}/files/${fileId}`,

  // Modals
  createSubjectModal: () => buildUrl("/subjects/create"),
  createProjectModal: (subjectId?: string) =>
    buildUrl("/projects/create", subjectId ? { subjectId } : undefined),
  selectProjectModal: (activeProjectId?: string) =>
    buildUrl(
      "/projects/select",
      activeProjectId ? { activeProjectId } : undefined
    ),
};
