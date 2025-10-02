import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditNotePage from "./pages/EditNotePage";


const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
  [background:radial-gradient(125%_125%_at_50%_10%,hsl(var(--b1))_60%,hsl(var(--a))_100%)]" />

      {/* Global Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/notes/:id/edit" element={<EditNotePage />} />
      </Routes>
    </div>
  );
};

export default App;
