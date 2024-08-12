import { useNotes } from "../context/NotesContext";

function NoteHeader({ sort, onSort }) {
  const notes = useNotes();
  return (
    <div className="note-header">
      <h1>My Notes({notes.length})</h1>
      <select value={sort} onChange={onSort}>
        <option value="latest">Latest Notes</option>
        <option value="earliest">Earliest Notes</option>
        <option value="completed">Completed Notes</option>
      </select>
    </div>
  );
}

export default NoteHeader;
