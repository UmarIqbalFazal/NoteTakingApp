import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <div data-theme="forest">
      {/* Global Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Example button (can remove later) */}
      <button className="btn btn-outline">Click me</button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
