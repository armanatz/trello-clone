import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableText from '../index';

describe('rendering', () => {
  it('renders input field correctly', () => {
    render(<EditableText />);
    const inputField: HTMLInputElement =
      screen.getByPlaceholderText('Enter a new list name');
    expect(inputField).toBeInTheDocument();
  });
});

describe('user behavior', () => {
  it('allows typing new value', async () => {
    let value = 'New List';

    const user = userEvent.setup();
    render(
      <EditableText
        value={value}
        setValue={passedValue => {
          value = passedValue;
        }}
      />,
    );

    const inputField: HTMLInputElement =
      screen.getByPlaceholderText('Enter a new list name');

    await user.clear(inputField);
    await user.type(inputField, 'To-dos');

    expect(inputField).toHaveValue('To-dos');
  });

  it('allows saving new value by pressing enter key', async () => {
    let value = 'New List';

    const user = userEvent.setup();
    render(
      <EditableText
        value={value}
        setValue={passedValue => {
          value = passedValue;
        }}
      />,
    );

    const inputField: HTMLInputElement =
      screen.getByPlaceholderText('Enter a new list name');

    await user.clear(inputField);
    await user.type(inputField, 'To-dos');
    await user.keyboard('{Enter}');

    expect(inputField).toHaveValue('To-dos');
    expect(value).toBe('To-dos');
  });

  it('allows cancelling value input by pressing escape key', async () => {
    let value = 'New List';

    const user = userEvent.setup();
    render(
      <EditableText
        value={value}
        setValue={passedValue => {
          value = passedValue;
        }}
      />,
    );

    const inputField: HTMLInputElement =
      screen.getByPlaceholderText('Enter a new list name');

    await user.clear(inputField);
    await user.type(inputField, 'To-dos');
    await user.keyboard('{Escape}');

    expect(inputField).toHaveValue(value);
    expect(value).toBe(value);
  });
});
