// MainMediaContents.js
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function MainMediaContents({ setUsername }) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/test2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          alert("로그인 기간이 만료되었습니다.");
          navigate("/");
        } else {
          const data = await response.json();
          localStorage.setItem("username", data.username);
          setUsername(data.username); // setUsername을 호출하여 username을 변경
          try {
            const response = await fetch('http://localhost:8080/localFileUpload', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Range': 'bytes=0-10000000'
              }
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.blob();
            const videoUrl = URL.createObjectURL(data);

            const videoElement = document.getElementById('videoPlayer');
            videoElement.src = videoUrl;

            console.log("Video data:", data);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // 컴포넌트가 마운트될 때 한 번만 API 요청 수행
  }, [navigate, setUsername, accessToken]);

  return (
    <div className="mobile-video-player">
      <div className="phone-container">
        <div className="phone">
          <div className="screen">
            <video id="videoPlayer" className="player" controls loop autoPlay width='100%' height='100%'>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMediaContents;
