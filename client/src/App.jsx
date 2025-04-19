import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import CreateQuiz from "./pages/createQuiz/CreateQuiz";

export const URL = import.meta.env.VITE_SERVER_URL;

function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createQuiz" element={<CreateQuiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
