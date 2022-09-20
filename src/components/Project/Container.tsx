import { memo, useContext, useState } from 'react';

import ProjectContext from '../../contexts/Project';

import ProjectColumn from './Column';
import ProjectCard from './Card';
import Modal from '../Modal';
import EditTaskForm from '../Forms/EditTaskForm';

import { onAddNewColumn } from './handlers';

import './style.css';

const DEFAULT_MODAL_STATE: ModalStateProps = {
  isOpen: false,
  data: null,
};

const TasksLayout = memo(
  ({ column, onClickTask }: TasksLayoutProps) => {
    return (
      <>
        {column.tasks?.map(task => (
          <ProjectCard
            key={task.id}
            id={task.id}
            colId={column.id}
            onClick={() => onClickTask(column.id, task)}
          >
            <p>{task.title}</p>
          </ProjectCard>
        ))}
      </>
    );
  },
);

const ProjectContainer = () => {
  const { columns, setColumns } =
    useContext(ProjectContext);

  const [modalState, setModalState] = useState(
    DEFAULT_MODAL_STATE,
  );

  const handleOnAddListBtnClick = () => {
    return setColumns((currentColumns: ColumnData[]) =>
      onAddNewColumn(currentColumns),
    );
  };

  const handleOnClickTask = (
    columnId: Id,
    taskData: TaskData,
  ) => {
    return setModalState(prevState => ({
      ...prevState,
      isOpen: true,
      data: { colId: columnId, task: taskData },
    }));
  };

  return (
    <>
      {modalState.isOpen && modalState.data ? (
        <Modal
          isOpen={modalState.isOpen}
          title="Edit Task"
          onClose={() => setModalState(DEFAULT_MODAL_STATE)}
        >
          <EditTaskForm
            taskData={modalState.data.task}
            onSubmit={() =>
              setModalState(DEFAULT_MODAL_STATE)
            }
          />
        </Modal>
      ) : null}
      <section className="project-container">
        {columns?.map(col => (
          <ProjectColumn
            key={col.id}
            id={col.id}
            title={col.title}
          >
            <TasksLayout
              column={col}
              onClickTask={handleOnClickTask}
            />
          </ProjectColumn>
        ))}
        <button
          className="add-column-btn btn"
          onClick={handleOnAddListBtnClick}
        >
          Add a list
        </button>
      </section>
    </>
  );
};

export default ProjectContainer;
