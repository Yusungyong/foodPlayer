import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
function RedirectPage() {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    let apiUrl = process.env.REACT_APP_PROD_API_URL;
    useEffect(() => {
      const kakaoLogin = async () => {
        try {
          const response = await axios.get(`${apiUrl}/kakaoLogin?code=${code}`);
          console.log(response.data);
  
          localStorage.setItem('username', response.data.name);
          localStorage.setItem('accessToken', response.data.accessToken);
          // 로그인이 성공하면 이동할 페이지
          navigate("/mediaMain");
        } catch (error) {
          console.error(error);
        }
      };
  
      if (code) {
        kakaoLogin();
      }
    }, [code, navigate]);
    return(
        <div className="redirectPage">
            <div>
                로그인 진행중입니다. 잠시만 기다려주세요.
            </div>
        </div>
    )

}

export default RedirectPage;