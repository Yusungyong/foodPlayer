import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpContents() {
    const navigator = useNavigate();
    // 각 입력값에 대한 상태를 정의합니다.
    const [username, setUsername]             = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail]       = useState('');
    const [phone, setPhone]       = useState('');
    const [signUpMessage, setSignUpMessage] = useState('');
    const handleSignUpClick = () => {
      const userData = {
          username: username,
          password: password,
          email: email,
          phone: phone
      };
  
    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        return response.json(); // JSON 데이터를 파싱하여 다음 .then 블록에 전달합니다.
    })
    .then(data => {
        setSignUpMessage(data.message);
        
        console.log('서버로부터 받은 데이터:', data.message);

        if(data.message == "중복 된 아이디 입니다." || data.message == "이미 가입 된 이메일 주소입니다.") {
            alert(data.message);
        } else {
            alert(data.message);
            navigator("/");
        }
    })
    .catch(error => {
        console.error("회원가입 오류:", error);
        alert('회원가입 중 오류가 발생했습니다.');
    });


  };

    const backClick = () => {
        // 뒤로 가기
        navigator("/");
    };
   
    return(
        <div className='contents'>
            <div className='signUpForm'>
                <div>
                    <label htmlFor="id">아이디 : </label>
                    <input className='signUpInputBox' type='text' id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호 : </label>
                    <input className='signUpInputBox' type='password' id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">이메일 : </label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />   
                </div>
                <div>
                    <label htmlFor="phone">핸드폰 : </label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}" placeholder="010-1234-5678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="loginBtnGrp">
                    <button className='loginBtn' onClick={handleSignUpClick}>가입요청</button>
                    <button className='loginBtn' onClick={backClick}>돌아가기</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpContents;
