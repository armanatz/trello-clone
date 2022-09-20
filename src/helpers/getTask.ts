import getColumn from './getColumn';

export default function getTask(
  columnId: Id,
  taskId: Id,
  currentColumns: ColumnData[],
  returnIndex = true,
) {
  const workingColIdx = getColumn(
    columnId,
    currentColumns,
  ) as number;

  const { tasks }: ColumnData =
    currentColumns[workingColIdx];

  if (!returnIndex) {
    return tasks.find(task => task.id === taskId);
  }

  return tasks.findIndex(task => task.id === taskId);
}
