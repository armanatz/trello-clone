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
