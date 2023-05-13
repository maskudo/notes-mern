function Note({ note, onCheckboxChange }) {
  const { text, _id, checked } = note;

  const handleCheckboxChange = () => {
    onCheckboxChange(_id);
  };

  return (
    <div className="note">
      <label htmlFor={_id}>
        <input type="checkbox" id={_id} onChange={handleCheckboxChange} />
        <span className={checked ? 'checked' : ''}>{text}</span>
      </label>
    </div>
  );
}

export default Note;
