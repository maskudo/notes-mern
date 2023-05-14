import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Note from './componenets/Note';
import {
  addNoteRoute,
  allNotesRoute,
  deleteNoteByIdRoute,
  updateNoteByIdRoute,
} from './utils/ApiRoutes';
import toastOptions from './utils/ToastOptions';
import {
  toastCreatingError,
  toastDeletingError,
  toastFetchingError,
  toastUpdatingError,
} from './utils/ToastErrors';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentEditingNote, setCurrentEditingNote] = useState(undefined);
  const [currentMode, setCurrentMode] = useState('create');
  const inputRef = useRef(undefined);

  useEffect(() => {
    async function getAllNotes() {
      let result = [];
      try {
        const { data } = await axios.get(allNotesRoute);
        if (data.status === false) {
          toastFetchingError();
          return;
        }
        result = data.data;
      } catch (e) {
        toastFetchingError();
      }
      setNotes(result);
    }

    getAllNotes();
  }, []);

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
        toastUpdatingError();
        return;
      }
      const updatedNotes = notes.map((note) => {
        if (note._id === data.data._id) {
          return data.data;
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      toastUpdatingError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentMode === 'create') {
      const note = { text: inputRef.current.value, checked: false };
      const { data } = await axios.post(addNoteRoute, note, {
        headers: {
          'content-type': 'application/json',
        },
      });
      if (data.status === false) {
        toastCreatingError();
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
      setCurrentMode('create');
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
        toastDeletingError();
      }
      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      toastDeletingError();
      // console.log(error);
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
      <header className="px-32 py-4 text-white font-mono">
        <h1 className="text-3xl">Notes</h1>
      </header>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex items-center py-4 px-32  gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          id="createNote"
          className="basis-3/4 p-2"
          required
          placeholder="Write something..."
        />
        <button type="submit" className="basis-1/12 create-edit-button">
          {currentMode === 'create' && <FontAwesomeIcon icon={faPlus} />}
          {currentMode === 'edit' && <FontAwesomeIcon icon={faPenToSquare} />}
        </button>
      </form>

      <div className="notes flex flex-col justify-center align-middle gap-4 py-4 px-32 ">
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
      <ToastContainer />
    </div>
  );
}

export default App;
