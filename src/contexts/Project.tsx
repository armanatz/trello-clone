import { createContext, useState } from 'react';

const ProjectContext = createContext({} as ProjectContext);

export const ProjectProvider = ({
  children,
}: ProjectProviderProps) => {
  const [columns, setColumns] = useState<
    ColumnData[] | never[]
  >([]);

  return (
    <ProjectContext.Provider
      value={{
        columns,
        setColumns,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
