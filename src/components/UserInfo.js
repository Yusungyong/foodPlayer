import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginStateSlice, { getLoginFailed, getLoginSuccess } from '../redux/authReducer';
function UserInfo() {
   const isLoggedIn = useSelector(state => state.login.isLoggedIn);    
   const navigate = useNavigate();
   let apiUrl = process.env.REACT_APP_PROD_API_URL;
   const accessToken = localStorage.getItem('token');
   const username = localStorage.getItem('username');
   const dispatch = useDispatch();
   const [userInfo, setUserInfo] = useState({
        userId: '',
        email: '',
        regCount: ''
    });

   useEffect(()=> {

    fetch(`${apiUrl}/userInfo2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'Range': 'bytes=0-10000000'
        },
        body: JSON.stringify(username)
      })
      .then(response => {
        if(response.ok){
            return response.json(); 
        } else {
            console.log("회원정보를 불러오지 못했습니다.")
        }
      })
      .then(data => {
        setUserInfo({ // 상태 업데이트
            userId: data.username,
            email: data.email,
            regCount: data.videoTotal
         });
        console.log(data); // 반환된 데이터를 출력
    })
   }, [] );

       
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



    return(
        <div className='userInfo'>
            <div>
                <div><p>계정 : {userInfo.userId}</p></div>
                <div><p>이메일 : {userInfo.email}</p></div>
                <div><p>등록 된 게시물 : {userInfo.regCount}</p></div>
                <div><button onClick={handleUserLogout}>로그아웃</button></div>
                
            </div>
        </div>
    );
}

export default UserInfo;
