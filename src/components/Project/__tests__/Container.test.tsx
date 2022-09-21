import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProjectContext from '../../../contexts/Project';
import ProjectContainer from '../Container';

import useLocalStorage from '../../../hooks/useLocalStorage';

const MockProvider = ({
  children,
}: ProjectProviderProps) => {
  const [columns, setColumns] = useLocalStorage<
    ColumnData[] | never[]
  >('instrello_pro_data', []);

  return (
    <ProjectContext.Provider
      value={{
        columns,
        setColumns,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

let MockContainer: () => React.ReactElement;

beforeAll(() => {
  MockContainer = () => (
    <MockProvider>
      <ProjectContainer />
    </MockProvider>
  );
});

describe('rendering', () => {
  it('renders the add a list button correctly', () => {
    render(<MockContainer />);

    const addListBtn: HTMLButtonElement =
      screen.getByText('Add a list');

    expect(addListBtn).toBeInTheDocument();
  });
});

describe('user behavior', () => {
  describe('column and task adding', () => {
    it('adds a new list on add a list button click', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);

      const addListBtn: HTMLButtonElement =
        screen.getByText('Add a list');

      await user.click(addListBtn);

      const newListHeader =
        screen.getByDisplayValue('New List');

      expect(newListHeader).toBeInTheDocument();
    });

    it('adds a new task on add a card button click', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);

      const addCardBtn: HTMLButtonElement =
        screen.getByText('Add a card');

      await user.click(addCardBtn);
      const newCardText = screen.getByText('New Task');
      expect(newCardText).toBeInTheDocument();
    });
  });

  describe('delete button display', () => {
    it('displays delete button in list on hover', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const list = screen.getByDisplayValue('New List');
      await user.hover(list);

      const deleteListBtn: HTMLButtonElement =
        screen.getByTitle('Delete List');

      expect(deleteListBtn).toBeInTheDocument();
    });

    it('hides delete button in list on unhover', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const list = screen.getByDisplayValue('New List');
      await user.hover(list);

      const deleteListBtn: HTMLButtonElement =
        screen.getByTitle('Delete List');

      await user.unhover(list);
      expect(deleteListBtn).not.toBeInTheDocument();
    });

    it('displays delete button in card on hover', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const task = screen.getByText('New Task');
      await user.hover(task);

      const deleteTaskBtn: HTMLButtonElement =
        screen.getByTitle('Delete Task');

      expect(deleteTaskBtn).toBeInTheDocument();
    });

    it('hides delete button in card on unhover', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const task = screen.getByText('New Task');
      await user.hover(task);

      const deleteTaskBtn: HTMLButtonElement =
        screen.getByTitle('Delete Task');

      await user.unhover(task);
      expect(deleteTaskBtn).not.toBeInTheDocument();
    });
  });

  describe('modal display', () => {
    it('shows modal on card click', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const task = screen.getByText('New Task');
      await user.click(task);
      const modal = screen.getByText('Edit Task');
      expect(modal).toBeInTheDocument();
    });

    it('closes modal on close button click', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const task = screen.getByText('New Task');
      await user.click(task);
      const modal = screen.getByText('Edit Task');
      const modalCloseBtn = screen.getByTitle(
        'Close Edit Task Dialog',
      );

      await user.click(modalCloseBtn);
      expect(modal).not.toBeInTheDocument();
    });

    it('closes modal on save button click', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const task = screen.getByText('New Task');
      await user.click(task);
      const modal = screen.getByText('Edit Task');
      const saveBtn = screen.getByText('Save');
      await user.click(saveBtn);
      expect(modal).not.toBeInTheDocument();
    });
  });

  describe('column and task deletion', () => {
    it('deletes task on trash icon click', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const task = screen.getByText('New Task');
      await user.hover(task);

      const deleteTaskBtn: HTMLButtonElement =
        screen.getByTitle('Delete Task');

      user.click(deleteTaskBtn).then(() => {
        expect(
          screen.queryByText('New Task'),
        ).not.toBeInTheDocument();
      });
    });

    it('deletes list on trash icon click', async () => {
      const user = userEvent.setup();
      render(<MockContainer />);
      const list = screen.getByDisplayValue('New List');
      await user.hover(list);

      const deleteListBtn: HTMLButtonElement =
        screen.getByTitle('Delete List');

      user.click(deleteListBtn).then(() => {
        expect(
          screen.queryByDisplayValue('New List'),
        ).not.toBeInTheDocument();
      });
    });
  });
});
