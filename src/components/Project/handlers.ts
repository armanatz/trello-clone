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

export const onDeleteColumn = (
  columnId: Id,
  currentColumns: ColumnData[],
) => {
  try {
    const columnsCopy =
      deepClone<ColumnData[]>(currentColumns);
    return columnsCopy.filter(col => col.id !== columnId);
  } catch (error) {
    throw new Error(
      `An error occurred while trying to delete column with ID of ${columnId}`,
    );
  }
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

export const onDeleteTask = (
  columnId: Id,
  taskId: Id,
  currentColumns: ColumnData[],
) => {
  let columnsCopy = deepClone<ColumnData[]>(currentColumns);

  const workingColIdx = getColumn(
    columnId,
    currentColumns,
  ) as number;

  columnsCopy[workingColIdx].tasks = columnsCopy[
    workingColIdx
  ].tasks.filter(task => task.id !== taskId);

  return columnsCopy;
};
