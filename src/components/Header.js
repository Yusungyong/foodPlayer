import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Header({ username }) {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(localStorage.getItem("loginSts")); // 초기값을 false로 설정

    // username이 변경될 때마다 loginState를 업데이트
    useEffect(() => {
        setLoginState(username != null);
    }, [username]);

    // 페이지 리셋 함수
    const pageReset = () => {
        if (localStorage.getItem("token")) {
            navigate('/mediaMain');
        } else {
            navigate('/');
        }
    };
    
    // 파일 업로드 페이지로 이동하는 함수
    const handleMoveFileUploadPage = () => {
        navigate('/FileUpload');
    };
    
    // 사용자 로그아웃 함수
    const handleUserLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            // 클라이언트 상태 초기화
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            
            alert("이용해주셔서 감사합니다.");
            // 로그인 상태 변경
            localStorage.setItem("loginSts", false);
            setLoginState(false);
            // 로그인 페이지로 리다이렉트
            navigate('/');
        }
    };

    return (
        <div className='Header'>
            <div>logo</div>
            <p className='logo' onClick={pageReset}>FoodPlayer</p>
            {(loginState) ? (
                <div className="profile">
                    <ul className='username'>{username}
                        <li>회원정보</li>
                        <li><button onClick={handleMoveFileUploadPage}>File Upload</button></li>
                        <li onClick={handleUserLogout}>로그아웃</li>
                    </ul>   
                </div>
            ) : (
                <div className="noProfile">
                    <ul className='username'></ul>
                </div>
            )}
        </div>
    );
}

export default Header;
