import React, { useState } from 'react';

import './style.css';

const EditableText = ({
  value,
  setValue,
  textInputClasses,
}: EditableTextProps) => {
  const [editingValue, setEditingValue] = useState(
    value || '',
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setEditingValue(e.target.value);

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter') {
      if (target.value.trim() === '') {
        setEditingValue(value || '');
      } else {
        if (setValue) {
          setValue(target.value);
        }
      }
      target.blur();
    } else if (e.key === 'Escape') {
      setEditingValue(value || '');
      target.blur();
    }
  };

  return (
    <input
      className={`editable-input${
        textInputClasses && ` ${textInputClasses}`
      }`}
      type="text"
      placeholder="Enter a new list name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default EditableText;
