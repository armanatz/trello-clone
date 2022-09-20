import { useState, useContext } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import ProjectContext from '../../contexts/Project';

const ProjectCard = ({
  children,
  id,
  colId,
}: ProjectCardProps) => {
  const { setColumns } = useContext(ProjectContext);

  const [showDelBtn, setShowDelBtn] = useState(false);

  const handleOnDelete = () => {
    console.log('Card deleted');
  };

  return (
    <div
      className="project-card"
      onMouseEnter={() => setShowDelBtn(true)}
      onMouseLeave={() => setShowDelBtn(false)}
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
