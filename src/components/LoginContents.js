import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
function LoginContents() {
    

  const REST_API_KEY = process.env.REACT_APP_RESTAPI_KEY;   // 카카오 개발자 사이트에서 받은 REST_API_KEY
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;  // 카카오 개발자 사이트에 등록한 REDIRECT_URI

  const navigator = useNavigate();

  const [username, setUsername]             = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(''); 

  const userData = {
    username: username,
    password: password
};


  const kakaoPageCallAddresss = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
  
  const handleLoginClick = () => {
    const userData = { username, password };
  
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        console.log(response.headers);
        const authorizationHeader = response.headers.get('Authorization');
        if (authorizationHeader) {
          const token = authorizationHeader.split(' ')[1]; // "Bearer {token}" 형식이므로 띄어쓰기를 기준으로 나누고 두 번째 요소를 선택
          // 토큰 값을 로컬 스토리지에 저장
          localStorage.setItem('token', token);
          console.log('Token saved to localStorage.');
          
          navigator("mediaMain");
        } else {
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
   
    return(
      <div className='contents'>
        <div className='loginForm'>
          <div><input className='loginInputBox'type='text' id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}></input></div>
          <div><input className='loginInputBox'type='password' id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleLoginClick();
            }
          }}
          ></input></div>
          <div className="loginBtnGrp">
            <button className='loginBtn' onClick={handleLoginClick}>로그인</button>
            <button className='loginBtn' onClick={handleSignUpClick}>회원가입</button>
          </div>
          <div className='social_login_group'>
            <a href={kakaoPageCallAddresss} ><img className='socialLoginLogo' src='./images/kakao_logo.png' alt="카카오 톡 로그인" /></a>
            <img className='socialLoginLogo' src='./images/google_logo.png' alt="구글 로그인" />
            <img className='socialLoginLogo' src='./images/naver_logo.png' alt="네이버 북 로그인" />
          </div>
        </div>
      </div>
    )



}
export default LoginContents;