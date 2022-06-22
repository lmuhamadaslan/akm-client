import React from "react";
import "./App.css";
import Login from "./components/loginpage/Login";
import KonfData from "./components/konfirmasidata/KonfData";
import Ujian from "./components/ujian/Ujian";
import Result from "./components/result/Result";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exac path="/" element={<Login />} />
          <Route path="/data" element={<KonfData />} />
          <Route path="/ujian" element={<Ujian />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
