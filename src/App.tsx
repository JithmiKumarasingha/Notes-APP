import exp from "constants";
import "./App.css";
import { useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
};
const App=() =>{
  const[notes, setNotes] = useState([
    {
      id: 1,
      title: "First Note",
      content: "This is the content of the first note."
    },
    {
      id: 2,
      title: "Second Note",
      content: "This is the content of the second note."
    },
    {      id: 3,
      title: "Third Note",
      content: "This is the content of the third note."
    },

      {      id: 4,
      title: "Forth Note",
      content: "This is the content of the forth note."
    }
  ]);

  const[title, setTitle] = useState("");
  const[content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    };
     
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  }; 

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    };
    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );
    setNotes(updatedNotesList);
    setSelectedNote(null);
    setTitle("");
    setContent("");
  }
  const handleCancel = () => {
    setSelectedNote(null);
    setTitle("");
    setContent("");
  };

  const deleteNote = (e:React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null);
      setTitle("");
      setContent("");
    }
  }
  return(
    <div className="app-container">
      <form className="note-form"
      onSubmit={(e) => {
        selectedNote ? handleUpdateNote(e) :
        handleAddNote(e);}
      }>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        />
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={10}
        required
        />

        {selectedNote ? (
          <div className="edit-buttons">
<button type="submit">Save</button>
<button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
        
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item"
          onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(e) =>
                              deleteNote(e, note.id)
                            }>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
        
      </div>
    </div>
  )
}
export default App;