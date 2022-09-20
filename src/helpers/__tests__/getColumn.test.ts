import getColumn from '../getColumn';

describe('getting columns', () => {
  it('gets correct column object', () => {
    const columns = [];
    const noOfCols = 3;

    for (let i = 0; i < noOfCols; i++) {
      columns.push({
        id: i + 1,
        title: 'New List',
        tasks: [],
      });
    }

    expect(getColumn(2, columns, false)).toMatchObject({
      id: 2,
      title: 'New List',
      tasks: [],
    });
  });

  it('gets correct column index', () => {
    const columns = [];
    const noOfCols = 3;

    for (let i = 0; i < noOfCols; i++) {
      columns.push({
        id: i + 1,
        title: 'New List',
        tasks: [],
      });
    }

    expect(getColumn(2, columns)).toBe(1);
  });
});
