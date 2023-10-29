import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Auth } from "./components/auth";
import { auth, db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { LandingPage } from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SIgnUp";
import { Home } from "./pages/Home";

// https://templates.iqonic.design/note-plus/html/backend/auth-sign-up.html
// https://templates.iqonic.design/note-plus/html/backend/index.html
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
