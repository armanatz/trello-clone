import getTask from '../getTask';

describe('getting tasks', () => {
  it('gets correct task object', () => {
    const now = Date.now();
    const tasks = [];
    const noOfTasks = 3;

    for (let i = 0; i < noOfTasks; i++) {
      tasks.push({
        id: i + 1,
        title: 'New Task',
        notes: null,
        createdAt: now,
      });
    }

    const currentColumns = [
      {
        id: 1,
        title: 'New List',
        tasks,
      },
    ];

    expect(
      getTask(1, 2, currentColumns, false),
    ).toMatchObject({
      id: 2,
      title: 'New Task',
      notes: null,
      createdAt: now,
    });
  });

  it('gets correct task index', () => {
    const now = Date.now();
    const tasks = [];
    const noOfTasks = 3;

    for (let i = 0; i < noOfTasks; i++) {
      tasks.push({
        id: i + 1,
        title: 'New List',
        notes: null,
        createdAt: now,
      });
    }

    const currentColumns = [
      {
        id: 1,
        title: 'New List',
        tasks,
      },
    ];

    expect(getTask(1, 2, currentColumns)).toBe(1);
  });
});
