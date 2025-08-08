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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("title:", title);
    console.log("content:", content);
     
  };  
  return(
    <div className="app-container">
      <form className="note-form"
      onSubmit={(e) => {
        handleSubmit(e);}
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
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button>x</button>
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