import { useNotes } from "../context/NotesContext";
import Message from "./Message";


function NoteStatus() {
  const notes = useNotes();
  const allNotes = notes.length;
  const completedNotes = notes.filter((note) => note.isCompleted).length;
  const uncompletedNotes = allNotes - completedNotes;
  // ! children props
//? instead of using the props, we use the children props between the opening and closing tags of a component
  if (!allNotes) return <Message>
   ⚠️ <span>No notes have already been added</span>
  </Message>;
  return (
    <ul className="note-status">
      <li>
        All <span>{allNotes}</span>
      </li>
      <li>
        Completed <span>{completedNotes}</span>
      </li>
      <li>
        Open <span>{uncompletedNotes}</span>
      </li>
    </ul>
  );
}

export default NoteStatus;
