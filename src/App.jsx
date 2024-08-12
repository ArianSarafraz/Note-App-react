import { useState } from "react";
import "./App.css";
import NoteHeader from "./components/NoteHeader";
import NoteApp from "./components/NoteApp";
import AppProviders from "./Providers/AppProviders";

function App() {
  const [sort, setSort] = useState("latest");

  return (
    <AppProviders>
      <div className="container">
        <NoteHeader sort={sort} onSort={(e) => setSort(e.target.value)} />
        <NoteApp sort={sort} />
      </div>
    </AppProviders>
  );
}

export default App;
