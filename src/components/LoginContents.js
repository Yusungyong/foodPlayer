import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginFailed, getLoginSuccess } from '../redux/authReducer'; // 변경된 부분

function LoginContents() { 
  console.log("LoginContents : " , localStorage.getItem('token'));
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const REST_API_KEY = process.env.REACT_APP_RESTAPI_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  let apiUrl = process.env.REACT_APP_PROD_API_URL;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const kakaoPageCallAddresss = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  
  const handleLoginClick = () => {
    const userData = { username, password };
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      console.log(response.headers.get('Authorization'));
      const authorizationHeader = response.headers.get('Authorization');
      if (authorizationHeader) {
        // 토큰 값을 로컬 스토리지에 저장 
        localStorage.setItem('token', authorizationHeader.split(' ')[1]);
        console.log('Token saved to localStorage.', localStorage.getItem('token'));
        setAccessToken(localStorage.getItem('token'));
        
      } else {
        alert("회원 정보를 확인해주세요.");
        dispatch(getLoginFailed());
        console.error('Authorization header not found in response');
      }
    })
    .catch(error => {
      console.error("로그인 오류:", error);
      alert('로그인 중 오류가 발생했습니다.');
    });
  };

  const handleSignUpClick = () => {
    navigator("signUp");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/userInfo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigator("/");
        } else {
          const data = await response.json();
          localStorage.setItem("username", data.username);
          dispatch(getLoginSuccess());
          navigator("/mediaMain");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (accessToken) {
      fetchData(); // accessToken이 변경될 때만 fetchData 함수 호출
    }
  }, [accessToken, dispatch, isLoggedIn, navigator]);

  return (
    <div className='contents'>
      <div className='loginForm'>
        <div>
          <input
            className='loginInputBox'
            type='text'
            id="username"
            name="username"
            placeholder='아이디를 입력해주세요.'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className='loginInputBox'
            type='password'
            id="password"
            name="password"
            placeholder='비밀번호를 입력해주세요.'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLoginClick();
              }
            }}
          />
        </div>
        <div className="loginBtnGrp">
          <button className='loginBtn' onClick={handleLoginClick}>로그인</button>
          <button className='loginBtn' onClick={handleSignUpClick}>회원가입</button>
        </div>
        <div className='social_login_group'>
          <a href={kakaoPageCallAddresss}><img className='socialLoginLogo' src='./images/kakao_logo.png' alt="카카오 톡 로그인" /></a>
          <img className='socialLoginLogo' src='./images/google_logo.png' alt="구글 로그인" />
          <img className='socialLoginLogo' src='./images/naver_logo.png' alt="네이버 북 로그인" />
        </div>
      </div>
    </div>
  );
}

export default LoginContents;
