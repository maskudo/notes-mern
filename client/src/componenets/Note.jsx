import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, parseISO } from 'date-fns';

function Note({ note, onCheckboxChange, onDelete, onUpdate }) {
  const { text, _id, checked, createdAt } = note;

  const dateObj = parseISO(createdAt);
  const formattedDate = format(dateObj, 'MMMM do');
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
    <div className={`${checked ? 'checked' : ''} note h-10 flex `}>
      <label htmlFor={_id} className=" flex w-full">
        <div className="checkbox flex justify-center align-middle mx-2">
          <input
            type="checkbox"
            id={_id}
            checked={checked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={`${checked ? 'line-through' : ''} w-full px-2 my-auto`}>
          <span>{text}</span>
        </div>
      </label>
      <div className="right flex mx-2">
        <div className="text-xs my-auto">
          <span>{formattedDate}</span>
        </div>
        <button type="button" className="mx-2" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button type="button" className="mx-2" onClick={handleUpdate}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    </div>
  );
}

export default Note;
