import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpContents() {
    const navigator = useNavigate();
    // 각 입력값에 대한 상태를 정의합니다.
    const [id, setId]             = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail]       = useState('');
    const [phone, setPhone]       = useState('');

    const handleSignUpClick = () => {
      const userData = {
          id: id,
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
        if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.'); // 예외 처리
        }
        return response.text(); // 서버 응답의 문자열 데이터를 반환
    })
    .then(successCode => {
        console.log('서버로부터 받은 successCode 값:', successCode);
        // 여기에서 successCode 값을 원하는 대로 처리할 수 있습니다.
    })
    //   .then(response => {
    //     if(response.ok){
    //         alert("가입 처리되었습니다.");
    //         navigator("/");
    //     } else {
    //         alert(response.text().userData);
    //     }
    //   })
      .catch(error => {
          console.error("회원가입 오류:", error);
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
                    <input className='signUpInputBox' type='text' id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} />
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
