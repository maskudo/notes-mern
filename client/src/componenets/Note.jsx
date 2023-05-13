function Note({ note, onCheckboxChange, onDelete, onUpdate }) {
  const { text, _id, checked, createdAt } = note;

  const handleCheckboxChange = () => {
    onCheckboxChange(_id);
  };

  const handleDelete = () => {
    onDelete(_id);
  };

  const handleUpdate = () => {
    onUpdate(_id);
  };

  return (
    <div className="note">
      <label htmlFor={_id}>
        <input
          type="checkbox"
          id={_id}
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <span className={checked ? 'checked' : ''}>{text}</span>
      </label>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <button type="button" onClick={handleUpdate}>
        Edit
      </button>
    </div>
  );
}

export default Note;
