import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const [username, setUsername] = useState(localStorage.getItem('username'));
    
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

    const handleUserInfo = () => {
        navigate('/UserInfo');
    }

    const handleMoveFileList = () => {
        navigate('/FileList');
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
                                <li onClick={handleMoveFileList}> 목록</li>
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
