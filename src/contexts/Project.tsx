import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ProjectContext = createContext({} as ProjectContext);

export const ProjectProvider = ({
  children,
}: ProjectProviderProps) => {
  const [columns, setColumns] = useLocalStorage<
    ColumnData[] | never[]
  >('instrello_pro_data', []);

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
