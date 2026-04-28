import { Route, Routes } from "react-router"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import NotesPage from "./pages/NotesPage"
import NoteDetail from "./pages/NoteDetail"
import CreateNote from "./pages/CreateNote"

function App() {
  

  return (
    <>
     <div className="min-h-screen bg-base-200 text-base-content">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/create" element={<CreateNote />} />
          </Routes>
        </main>
     </div>
    </>
  )
}

export default App
