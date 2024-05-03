import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginStateSlice, { getLoginFailed, getLoginSuccess } from '../redux/authReducer';

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const dispatch = useDispatch();
    // alert("username : " + username);
    // alert("isLoggedIn : " + isLoggedIn);

    // useEffect를 사용하여 isLoggedIn 상태가 변경될 때마다 username 업데이트
    useEffect(() => {
        if (isLoggedIn) {

            setUsername(localStorage.getItem('username'));
        } else {

            setUsername(null);
        }
    }, [isLoggedIn]);

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
            dispatch(getLoginFailed());
            alert("이용해주셔서 감사합니다.");
            // 로그인 페이지로 리다이렉트
            navigate('/');
        }
    };

    const handleUserInfo = () => {
        navigate('/UserInfo');
    }

    return (
        <div>
            <div className='Header'>
                <p className='logo' onClick={pageReset}>FoodPlayer</p>
            </div>
                <div className='navbar'>
                    {(isLoggedIn) ? (
                            <ul className='username'>
                                <li onClick={pageReset}>View</li>
                                <li onClick={handleMoveFileUploadPage}>File Upload</li>
                                <li onClick={handleUserLogout}>로그아웃</li>
                                <li onClick={handleUserInfo}>회원정보</li>
                            </ul>   
                    ) : (
                            <ul className='username'></ul>
                    )}
                </div>
        </div>

    );
}

export default Header;
