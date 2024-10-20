import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const example: ProjectInterface = {
  id: "project_name",
  image: "",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  name: "This is an example of the project",
  content: {
    en: {
      tldr: "Short description",
      description: `
## Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `,
    },
  },
  tags: {
    keywords: [],
    themes: [],
    types: [],
    builtWith: [],
  },
}
