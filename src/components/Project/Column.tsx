import { useContext, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import ProjectContext from '../../contexts/Project';
import EditableText from '../EditableText';

import {
  onAddTask,
  onDeleteColumn,
  onEditColumnName,
} from './handlers';

const ProjectColumn = ({
  id,
  title,
  children,
}: ProjectColumnProps) => {
  const { columns, setColumns } =
    useContext(ProjectContext);

  const [titleValue, setTitleValue] = useState(
    title || 'Enter column name',
  );

  const [showDelBtn, setShowDelBtn] = useState(false);

  const handleSetTitleValue = (value: string) => {
    setTitleValue(value);
    const newColumns = onEditColumnName(id, value, columns);
    return setColumns(newColumns);
  };

  const handleOnDelete = () =>
    setColumns((currentColumns: ColumnData[]) =>
      onDeleteColumn(id, currentColumns),
    );

  const handleOnAddCard = () =>
    setColumns((currentCols: ColumnData[]) =>
      onAddTask(id, currentCols),
    );

  return (
    <div
      className="project-column"
      onMouseEnter={() => setShowDelBtn(true)}
      onMouseLeave={() => setShowDelBtn(false)}
    >
      <div className="project-column-title-wrapper">
        <EditableText
          value={titleValue}
          setValue={handleSetTitleValue}
          textInputClasses="project-column-title"
        />
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
