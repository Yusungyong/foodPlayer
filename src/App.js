// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginContents from './components/LoginContents';
import SignUpContents from './components/SignUpContents';
import MainMediaContents from './components/MainMediaContents';
import FileUpload from './components/FileUpload';

function App() {
  // username 상태 초기화
  const [username, setUsername] = useState("");

  // 컴포넌트가 마운트될 때 한 번 실행되는 useEffect
  useEffect(() => {
    // 로컬 스토리지에서 username을 가져와 설정
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  return (
    <div className="App">
      <Router>
        <Header username={username} />
        <Routes>
          <Route path="/" element={<LoginContents />} />
          <Route path="/signUp" element={<SignUpContents />} />
          <Route
            path="/mediaMain"
            element={<MainMediaContents setUsername={setUsername} />}
          />
          <Route path="/FileUpload" element={<FileUpload setUsername={setUsername}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
