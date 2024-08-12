import { createContext, useContext, useReducer } from "react";

const NotesContext = createContext(null);
const NotesDispatchContext = createContext(null);

function notesReducer(state, action) {
  switch (action.type) {
    case "addNote": {
      return [...state, action.payload];
    }
    case "deleteNote": {
      return state.filter((note) => note.id !== action.payload);
    }
    case "completedNote": {
      return state.map((note) => {
        return note.id === action.payload
          ? { ...note, isCompleted: !note.isCompleted }
          : note;
      });
    }
    default:
      throw new Error("unknown error" + action.type);
  }
}

export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, []);
  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}

export function useNotesDispatch() {
  return useContext(NotesDispatchContext);
}
