import {} from '../handlers';

describe('column manipulation', () => {
  describe('adding columns', () => {
    it.todo('adds a new column to empty column data array');

    it.todo(
      'adds a new column to non-empty column data array',
    );

    it.todo(
      'errors out if trying to add to columns data array that is undefined',
    );
  });

  describe('column name editing', () => {
    it.todo('changes column name correctly');

    it.todo(
      'returns original column name if empty string supplied',
    );

    it.todo(
      'returns original column name if undefined/null is supplied',
    );
  });

  describe('deleting columns', () => {
    it.todo('deletes the correct column');

    it.todo(
      'returns empty array if column data array is empty',
    );

    it.todo(
      'throws error if column data array is undefined',
    );
  });
});

describe('task manipulation', () => {
  describe('adding tasks', () => {
    it.todo('adds a new task to empty task data array');

    it.todo('adds a new task to non-empty task data array');
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
    it.todo('deletes the correct task');
  });
});
