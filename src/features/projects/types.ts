export type ProjectSelector = {
  id: string;
  name: string;
  readableId: string;
  description: string;
};

export type ProjectsGroupedBySubject = {
  subjectId: string;
  subjectName: string;
  subjectShortcode: string;
  subjectDescription: string;
  projects: ProjectSelector[];
};
