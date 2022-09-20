import deepClone from '../../utils/deepClone';
import { getColumn } from '../../helpers';

export const onAddNewColumn = (
  currentColumns: ColumnData[],
) => {
  const columnsCopy =
    deepClone<ColumnData[]>(currentColumns);

  columnsCopy.push({
    id: columnsCopy.length + 1,
    title: 'New List',
    tasks: [],
  });

  return columnsCopy;
};

export const onAddTask = (
  columnId: Id,
  currentColumns: ColumnData[],
) => {
  const columnsCopy =
    deepClone<ColumnData[]>(currentColumns);

  const workingColIdx = getColumn(
    columnId,
    columnsCopy,
  ) as number;

  columnsCopy[workingColIdx].tasks.push({
    id: columnsCopy[workingColIdx].tasks.length + 1,
    title: 'New Task',
    notes: null,
    createdAt: Date.now(),
  });

  return columnsCopy;
};
