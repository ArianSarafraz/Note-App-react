import { useNotes, useNotesDispatch } from "../context/NotesContext";

function NoteList({ sort }) {
  const notes = useNotes();
  let sortedNotes = notes;
  if (sort === "earliest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  if (sort === "latest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  if (sort === "completed") {
    sortedNotes = notes.filter((note) => note.isCompleted);
  }
  return (
    <div className="note-list">
      {sortedNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NoteList;

function NoteItem({ note }) {
  const dispatch = useNotesDispatch();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div
      className={`note-item ${note.isCompleted ? "completed" : ""}`}
      data-testid="note-item"
    >
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.desc}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch({ type: "deleteNote", payload: note.id })}
          >
            ❌
          </button>
          <input
            type="checkbox"
            value={note.id}
            checked={note.isCompleted}
            onChange={(e) => {
              const noteId = Number(e.target.value);
              dispatch({ type: "completedNote", payload: noteId });
            }}
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", options)}
      </div>
    </div>
  );
}
