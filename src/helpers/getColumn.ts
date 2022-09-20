export default function getColumn(
  columnId: Id,
  currentColumns: ColumnData[],
  returnIndex = true,
) {
  if (!returnIndex) {
    return currentColumns.find(col => col.id === columnId);
  }
  return currentColumns.findIndex(
    col => col.id === columnId,
  );
}
