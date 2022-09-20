import React, {
  memo,
  useContext,
  useMemo,
  useState,
} from 'react';
import ProjectContext from '../../../contexts/Project';

import { onEditTask } from '../../Project/handlers';

import '../style.css';

const ColOptions = memo<ColOptionsProps>(({ columns }) => (
  <>
    {columns.map(col => (
      <option key={col.id} value={col.id}>
        {col.title}
      </option>
    ))}
  </>
));

const EditTaskForm = ({
  taskData,
  onSubmit,
}: EditTaskFormProps) => {
  const { columns, setColumns } =
    useContext(ProjectContext);

  const currentColId = useMemo(() => {
    let columnId: Id | undefined;
    for (let i = 0; i < columns.length; i++) {
      let columnFound = false;
      columns[i].tasks.forEach(task => {
        if (taskData.id === task.id) {
          columnFound = true;
        }
      });
      if (columnFound) {
        columnId = columns[i].id;
      }
    }
    return columnId;
  }, [columns, taskData.id]);

  const [taskNameInputVal, setTaskNameInputVal] = useState(
    taskData.title,
  );
  const [taskNotesInputVal, setTaskNotesInputVal] =
    useState(taskData.notes);
  const [selectedColId, setSelectedColId] =
    useState(currentColId);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !taskNameInputVal ||
      taskNameInputVal.trim().length === 0
    ) {
      return alert('Task name is required');
    }

    if (currentColId && selectedColId) {
      const formData = {
        ...(taskData.title !== taskNameInputVal && {
          taskTitle: taskNameInputVal,
        }),
        ...(taskData.notes !== taskNotesInputVal && {
          taskNotes: taskNotesInputVal,
        }),
        ...(currentColId !== selectedColId && {
          selectedColId,
        }),
      };

      const newColumns = onEditTask({
        currentColId,
        taskData,
        currentColumns: columns,
        formData,
      });

      setColumns(newColumns);

      if (onSubmit) {
        return onSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-input">
        <label htmlFor="taskName">
          Name <span style={{ color: 'red' }}>*</span> :
        </label>
        <input
          name="taskName"
          type="text"
          value={taskNameInputVal}
          onChange={e =>
            setTaskNameInputVal(e.target.value)
          }
        />
      </div>
      <div className="form-input">
        <label htmlFor="taskNotes">Notes:</label>
        <textarea
          name="taskNotes"
          value={taskNotesInputVal || ''}
          rows={5}
          onChange={e =>
            setTaskNotesInputVal(e.target.value)
          }
        />
      </div>
      <div className="form-input">
        <label htmlFor="columnName">In Column:</label>
        <select
          name="columnName"
          value={selectedColId}
          onChange={e =>
            setSelectedColId(parseInt(e.target.value))
          }
        >
          <ColOptions columns={columns} />
        </select>
      </div>
      <div className="form-input">
        <button type="submit" className="modal-btn btn">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
