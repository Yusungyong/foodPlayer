import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpContents() {
    const navigator = useNavigate();
    let apiUrl = process.env.REACT_APP_PROD_API_URL;

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
  
    fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        return response.text(); // JSON 데이터를 파싱하여 다음 .then 블록에 전달합니다.
    })
    .then(data => {
        setSignUpMessage(data);
        
        console.log('서버로부터 받은 데이터:', data);

        if(data == "중복 된 아이디 입니다." || data == "이미 가입 된 이메일 주소입니다.") {
            alert(data);
        } else {
            alert(data);
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
                    <label htmlFor="id"></label>
                    <input className='signUpInputBox' type='text' id="username" name="username" placeholder='아이디를 입력해주세요.' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input className='signUpInputBox' type='password' id="password" name="password" placeholder='비밀번호를 입력해주세요.' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input type="email" id="email" name="email" placeholder='이메일주소를 입력해주세요.' value={email} onChange={(e) => setEmail(e.target.value)} />   
                </div>
                <div>
                    <label htmlFor="phone"></label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}" placeholder="핸드폰 번호를 입력해주세요(숫자만)" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
