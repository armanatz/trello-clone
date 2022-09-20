import deepClone from '../../utils/deepClone';

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
