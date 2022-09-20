import { useContext, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import ProjectContext from '../../contexts/Project';

const ProjectColumn = ({
  id,
  title,
  children,
}: ProjectColumnProps) => {
  const { columns, setColumns } =
    useContext(ProjectContext);

  const [showDelBtn, setShowDelBtn] = useState(false);

  const handleOnDelete = () => {
    console.log('I deleted');
  };

  const handleOnAddCard = () => {
    console.log('Card added');
  };

  return (
    <div
      className="project-column"
      onMouseEnter={() => setShowDelBtn(true)}
      onMouseLeave={() => setShowDelBtn(false)}
    >
      <div className="project-column-title-wrapper">
        <h4 className="project-column-title">{title}</h4>
        {showDelBtn ? (
          <button
            title="Delete List"
            className="delete-btn btn"
            onClick={handleOnDelete}
          >
            <TrashIcon />
          </button>
        ) : null}
      </div>
      <div className="project-column-items">{children}</div>
      <button
        className="add-card-btn btn"
        onClick={handleOnAddCard}
      >
        Add a card
      </button>
    </div>
  );
};

export default ProjectColumn;
