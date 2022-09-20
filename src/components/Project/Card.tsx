import React, { useState, useContext } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import ProjectContext from '../../contexts/Project';

import { onDeleteTask } from './handlers';

const ProjectCard = ({
  children,
  id,
  colId,
  onClick,
}: ProjectCardProps) => {
  const { setColumns } = useContext(ProjectContext);

  const [showDelBtn, setShowDelBtn] = useState(false);

  const handleOnDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setColumns((currentColumns: ColumnData[]) =>
      onDeleteTask(colId, id, currentColumns),
    );
  };

  return (
    <div
      className="project-card"
      onMouseEnter={() => setShowDelBtn(true)}
      onMouseLeave={() => setShowDelBtn(false)}
      onClick={onClick}
    >
      <>
        <div
          className="project-card-body"
          style={{ width: showDelBtn ? '17rem' : '20rem' }}
        >
          {children}
        </div>
        {showDelBtn ? (
          <button
            title="Delete Task"
            className="delete-btn btn"
            onClick={handleOnDelete}
          >
            <TrashIcon />
          </button>
        ) : null}
      </>
    </div>
  );
};

export default ProjectCard;
