// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import LoginContents from './components/LoginContents';
import SignUpContents from './components/SignUpContents';
import MainMediaContents from './components/MainMediaContents';
import FileUpload from './components/FileUpload';
import RedirectPage from './components/RedirectPage';

function App() {
  console.log("App : " , localStorage.getItem('token'));
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginContents />} />
          <Route path="/signUp" element={<SignUpContents />} />
          <Route path="/mediaMain" element={<MainMediaContents  />} />
          <Route path="/FileUpload" element={<FileUpload />} />
          <Route path="/RedirectPage" element={<RedirectPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
