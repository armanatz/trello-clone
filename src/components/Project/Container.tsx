import { memo, useContext } from 'react';

import ProjectContext from '../../contexts/Project';

import ProjectColumn from './Column';
import ProjectCard from './Card';

import { onAddNewColumn } from './handlers';

import './style.css';

const TasksLayout = memo(({ column }: TasksLayoutProps) => {
  return (
    <>
      {column.tasks?.map(task => (
        <ProjectCard
          key={task.id}
          id={task.id}
          colId={column.id}
        >
          <p>{task.title}</p>
        </ProjectCard>
      ))}
    </>
  );
});

const ProjectContainer = () => {
  const { columns, setColumns } =
    useContext(ProjectContext);

  const handleOnAddListBtnClick = () => {
    return setColumns((currentColumns: ColumnData[]) =>
      onAddNewColumn(currentColumns),
    );
  };

  return (
    <section className="project-container">
      {columns?.map(col => (
        <ProjectColumn
          key={col.id}
          id={col.id}
          title={col.title}
        >
          <TasksLayout column={col} />
        </ProjectColumn>
      ))}
      <button
        className="add-column-btn btn"
        onClick={handleOnAddListBtnClick}
      >
        Add a list
      </button>
    </section>
  );
};

export default ProjectContainer;
