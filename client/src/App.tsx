import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
