import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Note from './componenets/Note';
import {
  addNoteRoute,
  allNotesRoute,
  deleteNoteByIdRoute,
  updateNoteByIdRoute,
} from './utils/ApiRoutes';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentEditingNote, setCurrentEditingNote] = useState(undefined);
  const [currentMode, setCurrentMode] = useState('add');
  const inputRef = useRef(undefined);

  useEffect(() => {
    async function fn() {
      const { data } = await axios.get(allNotesRoute);
      if (data.status === false) {
        console.log('failed fetching all notes');
        return;
      }
      setNotes(data.data);
    }
    fn();
  });

  const handleNoteUpdate = async (updatedNote) => {
    try {
      const data = await axios.put(
        `${updateNoteByIdRoute}/${updatedNote._id}`,
        updatedNote,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (data.status === false) {
        console.log('failed updating note');
        return;
      }
      const updatedNotes = notes.map((note) => {
        if (note._id === data.data._id) {
          return data.data;
        }
        return data;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentMode === 'add') {
      const note = { text: inputRef.current.value, checked: false };
      const { data } = await axios.post(addNoteRoute, note, {
        headers: {
          'content-type': 'application/json',
        },
      });
      if (data.status === false) {
        console.log('failed note creation');
        return;
      }
      setNotes([...notes, data.data]);
      inputRef.current.value = '';
    } else if (currentMode === 'edit') {
      const note = {
        ...notes.find((aNote) => aNote._id === currentEditingNote),
        text: inputRef.current.value,
        checked: false,
      };
      handleNoteUpdate(note);
      inputRef.current.value = '';
      setCurrentMode('add');
    }
  };

  const handleCheckboxChange = (noteId) => {
    const oldNote = notes.find((aNote) => aNote._id === noteId);
    const note = {
      ...oldNote,
      checked: !oldNote.checked,
    };
    handleNoteUpdate(note);
  };

  const handleDelete = async (noteId) => {
    try {
      const data = await axios.delete(`${deleteNoteByIdRoute}/${noteId}`);
      if (!data.status) {
        console.log('Deleting Note failed');
      }
      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (noteId) => {
    inputRef.current.value = notes.find((note) => note._id === noteId).text;
    inputRef.current.focus();
    setCurrentMode('edit');
    setCurrentEditingNote(noteId);
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
