// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import loginStateSlice, { getLoginFailed, getLoginSuccess } from './redux/authReducer';
import Header from './components/Header';
import LoginContents from './components/LoginContents';
import SignUpContents from './components/SignUpContents';
import MainMediaContents from './components/MainMediaContents';
import FileUpload from './components/FileUpload';
import RedirectPage from './components/RedirectPage';
import UserInfo from './components/UserInfo';
import FileList from './components/FileList';
import FileDetail from './components/FileDetail';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  let apiUrl = process.env.REACT_APP_PROD_API_URL;
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`${apiUrl}/userInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if(response.ok) {
        dispatch(getLoginSuccess());
        console.log("App : " , localStorage.getItem('token'));
        return response.json(); 
      } else {
        dispatch(getLoginFailed());

      }
    })
    .then(data => {
      console.log(data);
    })
    
  }, []);

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
          <Route path="/UserInfo" element={<UserInfo />} />
          <Route path="/FileList" element={<FileList />} />
          <Route path="/FileDetail/:fileId" element={<FileDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
