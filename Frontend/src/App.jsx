import { Routes, Route } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'

import HomePage from "./pages/HomePage"
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'



const App = () => {
  return (
    <div data-theme="forest">
       <button className="btn btn-outline">Click me</button>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/Note/:id" element={<NoteDetailPage />} />
    </Routes>
    </div>
  )
}

export default App
