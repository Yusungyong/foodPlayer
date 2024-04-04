// import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function LoginContents() {
    

  const REST_API_KEY = process.env.REACT_APP_RESTAPI_KEY;   // 카카오 개발자 사이트에서 받은 REST_API_KEY
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;  // 카카오 개발자 사이트에 등록한 REDIRECT_URI

  const navigator = useNavigate();

  const kakaoPageCallAddresss = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
    const handleLoginClick = () => {
       alert("로그인 버튼 선택");

    };

    const handleSignUpClick = () => {
      navigator("signUp");
   };
   
    return(
      <div className='contents'>
        <div className='loginForm'>
          <div><input className='loginInputBox'type='text'></input></div>
          <div><input className='loginInputBox'type='password'></input></div>
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