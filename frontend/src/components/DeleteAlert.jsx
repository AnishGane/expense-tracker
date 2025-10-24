import React from 'react';

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm text-white">{content}</p>

      <div className="mt-2 flex justify-end gap-2">
        <button className="add-btn add-btn-fill" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
