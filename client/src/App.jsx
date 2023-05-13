import { useRef, useState } from 'react';
import Note from './componenets/Note';

function App() {
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState(0);
  const [currentEditingNote, setCurrentEditingNote] = useState(undefined);
  const [currentMode, setCurrentMode] = useState('add');
  const inputRef = useRef(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMode === 'add') {
      const note = { text: inputRef.current.value, _id: id, checked: false };
      setNotes([...notes, note]);
      inputRef.current.value = '';
      setId(id + 1);
    } else if (currentMode === 'edit') {
      const note = {
        text: inputRef.current.value,
        _id: currentEditingNote,
        checked: false,
      };
      const updatedNotes = notes.map((prevNote) => {
        if (prevNote._id === currentEditingNote) {
          return note;
        }
        return prevNote;
      });
      setNotes(updatedNotes);
      inputRef.current.value = '';
      setCurrentMode('add');
    }
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

  const handleDelete = (noteId) => {
    const updatedNotes = notes.filter((note) => note._id !== noteId);
    setNotes(updatedNotes);
  };

  const handleUpdate = (noteId) => {
    inputRef.current.value = notes.find((note) => note._id === noteId).text;
    inputRef.current.focus();
    setCurrentMode('edit');
    setCurrentEditingNote((_) => noteId);
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
        <button type="submit">{currentMode.toUpperCase()}</button>
      </form>

      <div className="notes">
        {!!notes.length &&
          notes.map((note) => (
            <Note
              note={note}
              onCheckboxChange={handleCheckboxChange}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              key={note._id}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
