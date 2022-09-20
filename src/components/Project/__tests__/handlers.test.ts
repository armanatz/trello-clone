import {
  onAddNewColumn,
  onAddTask,
  onDeleteColumn,
  onDeleteTask,
  onEditColumnName,
} from '../handlers';

describe('column manipulation', () => {
  describe('adding columns', () => {
    it('adds a new column to empty column data array', () => {
      const currentColumns: never[] = [];
      expect(onAddNewColumn(currentColumns)).toHaveLength(
        1,
      );
    });

    it('adds a new column to non-empty column data array', () => {
      const currentColumns = [
        {
          id: 1,
          title: 'New List',
          tasks: [],
        },
      ];
      expect(onAddNewColumn(currentColumns)).toHaveLength(
        2,
      );
    });

    it('errors out if trying to add to columns data array that is undefined', () => {
      const currentColumns = undefined;
      expect(() => {
        // @ts-ignore
        onAddNewColumn(currentColumns);
      }).toThrow();
    });
  });

  describe('column name editing', () => {
    it('changes column name correctly', () => {
      const currentColumns = [
        {
          id: 1,
          title: 'New List',
          tasks: [],
        },
      ];

      expect(
        onEditColumnName(
          1,
          'List Name Changed',
          currentColumns,
        )[0],
      ).toMatchObject({
        ...currentColumns[0],
        title: 'List Name Changed',
      });
    });

    it('returns original column name if empty string supplied', () => {
      const currentColumns = [
        {
          id: 1,
          title: 'New List',
          tasks: [],
        },
      ];

      expect(
        onEditColumnName(1, '', currentColumns),
      ).toMatchObject(currentColumns);
    });

    it('returns original column name if undefined/null is supplied', () => {
      const currentColumns = [
        {
          id: 1,
          title: 'New List',
          tasks: [],
        },
      ];

      expect(
        // @ts-ignore
        onEditColumnName(1, undefined, currentColumns),
      ).toMatchObject(currentColumns);

      expect(
        // @ts-ignore
        onEditColumnName(1, null, currentColumns),
      ).toMatchObject(currentColumns);
    });
  });

  describe('deleting columns', () => {
    it('deletes the correct column', () => {
      const currentColumns = [
        {
          id: 1,
          title: 'New List',
          tasks: [],
        },
        {
          id: 2,
          title: 'New List',
          tasks: [],
        },
        {
          id: 3,
          title: 'New List',
          tasks: [],
        },
      ];

      const newColumns = onDeleteColumn(2, currentColumns);

      expect(newColumns).toHaveLength(2);
      expect(newColumns).toMatchObject([
        currentColumns[0],
        currentColumns[2],
      ]);
    });

    it('returns empty array if column data array is empty', () => {
      const currentColumns: never[] = [];

      expect(
        onDeleteColumn(1, currentColumns),
      ).toHaveLength(0);
    });

    it('throws error if column data array is undefined', () => {
      const currentColumns = undefined;

      expect(() => {
        // @ts-ignore
        onDeleteColumn(1, currentColumns);
      }).toThrow();
    });
  });
});

describe('task manipulation', () => {
  describe('adding tasks', () => {
    it('adds a new task to empty task data array', () => {
      const currentColumns = [
        {
          id: 1,
          title: 'New List',
          tasks: [],
        },
      ];

      const newColumns = onAddTask(1, currentColumns);

      expect(newColumns[0].tasks).toHaveLength(1);
    });

    it('adds a new task to non-empty task data array', () => {
      const currentColumns = [
        {
          id: 1,
          title: 'New List',
          tasks: [
            {
              id: 1,
              title: 'New Task',
              notes: null,
              createdAt: Date.now(),
            },
          ],
        },
      ];

      const newColumns = onAddTask(1, currentColumns);

      expect(newColumns[0].tasks).toHaveLength(2);
    });
  });

  describe('editing tasks', () => {
    it.todo("edits chosen task's name correctly");

    it.todo(
      'adds note to chosen task if task notes is currently null',
    );

    it.todo("edits chosen task's notes correctly");

    it.todo(
      'correctly changes the column which the task belongs to',
    );
  });

  describe('deleting tasks', () => {
    it('deletes the correct task', () => {
      const now = Date.now();
      const currentColumns = [
        {
          id: 1,
          title: 'New List',
          tasks: [
            {
              id: 1,
              title: 'New Task',
              notes: null,
              createdAt: now,
            },
            {
              id: 2,
              title: 'New Task',
              notes: null,
              createdAt: now,
            },
            {
              id: 3,
              title: 'New Task',
              notes: null,
              createdAt: now,
            },
          ],
        },
      ];

      expect(
        onDeleteTask(1, 2, currentColumns)[0].tasks,
      ).toMatchObject([
        currentColumns[0].tasks[0],
        currentColumns[0].tasks[2],
      ]);
    });
  });
});
