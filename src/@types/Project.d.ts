type ProjectContext = {
  columns: ColumnData[];
  setColumns: SetValue<ColumnData[] | never[]>;
};

interface ProjectProviderProps
  extends React.PropsWithChildren {}

type ColumnData = {
  id: Id;
  title: string;
  tasks: TaskData[];
};

type TaskData = {
  id: Id;
  title: string;
  notes: string | null;
  createdAt: UnixTime;
};

interface TasksLayoutProps extends React.PropsWithChildren {
  column: ColumnData;
}

interface ProjectColumnProps
  extends React.PropsWithChildren {
  id: Id;
  title?: string;
}

interface ProjectCardProps extends React.PropsWithChildren {
  id: Id;
  colId: Id;
}
