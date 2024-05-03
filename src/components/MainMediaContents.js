import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScreenInfo from '../components/ScreenInfo';
import loginStateSlice, { getLoginFailed, getLoginSuccess } from '../redux/authReducer';

function MainMediaContents() {
  const accessToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  let apiUrl = process.env.REACT_APP_PROD_API_URL;
  console.log("MainMediaContents : " , apiUrl);

  
  useEffect(() => {
    const fetchData = async () => {

          try {
            const response = await fetch(`${apiUrl}/play-video`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Range': 'bytes=0-10000000'
              }
            });
            if (!response.ok) {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              dispatch(getLoginFailed());
              navigator("/");
              alert("토큰이 만료되어 로그아웃 되었습니다.");
              
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
    };

    fetchData(); // 컴포넌트가 마운트될 때 한 번만 API 요청 수행
  }, [accessToken]);

  const handleItemSelect = (fileId) => {
        
    
        const fetchData = async () => {
          console.log("mainID : " , fileId.className);
          try {
            const response = await fetch(`${apiUrl}/play-video2?fileId=${fileId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Range': 'bytes=0-10000000'
              }
            });
            if (!response.ok) {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              dispatch(getLoginFailed());
              navigator("/");
              alert("토큰이 만료되어 로그아웃 되었습니다.");
              
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
          
    };

    fetchData();
  };

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
          <ScreenInfo onItemSelect={handleItemSelect} />
      </div>
    </div>
  );
}

export default MainMediaContents;
