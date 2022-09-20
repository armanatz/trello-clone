import { memo, useContext } from 'react';

import ProjectContext from '../../contexts/Project';

import './style.css';

const TasksLayout = memo(({ column }: TasksLayoutProps) => {
  return (
    <>
      {column.tasks?.map(task => (
        <div key={task.id}>
          <p>{task.title}</p>
        </div>
      ))}
    </>
  );
});

const ProjectContainer = () => {
  const { columns } = useContext(ProjectContext);

  return (
    <section className="project-container">
      {columns?.map(col => (
        <div key={col.id}>
          {col.title}
          <TasksLayout column={col} />
        </div>
      ))}
      <button className="add-column-btn btn">
        Add a list
      </button>
    </section>
  );
};

export default ProjectContainer;
