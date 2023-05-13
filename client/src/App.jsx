import { useRef, useState } from 'react';
import Note from './componenets/Note';

function App() {
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState(0);
  const inputRef = useRef(undefined);
  const handleSubmit = (e) => {
    e.preventDefault();
    const note = { text: inputRef.current.value, _id: id, checked: false };
    setNotes([...notes, note]);
    inputRef.current.value = '';
    setId(id + 1);
  };

  const handleCheckboxChange = (noteId) => {
    const updatedNotes = notes.map((note) => {
      if (note._id === noteId) {
        return { ...note, checked: !note.checked };
      }
      return note;
    });
    setNotes(updatedNotes);
  };
  return (
    <div className="app">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="addNote">
          <input
            ref={inputRef}
            type="text"
            id="addNote"
            placeholder="Add note"
          />
        </label>
        <button type="submit">Add</button>
      </form>

      <div className="notes">
        {!!notes.length &&
          notes.map((note) => (
            <Note
              note={note}
              onCheckboxChange={handleCheckboxChange}
              key={note._id}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
