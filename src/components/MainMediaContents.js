import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScreenInfo from '../components/ScreenInfo';
import MenuInfo from '../components/MenuInfo';

function MainMediaContents() {
  const accessToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [parameterId, setParameterId] = useState('');
  let apiUrl = process.env.REACT_APP_PROD_API_URL;
  console.log("MainMediaContents : " , apiUrl);


  useEffect(() => {
    fetch(`${apiUrl}/play-video`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if(response.ok) {
        return response.text(); 
      } else {
        console.log("파일정보를 불러오지 못했습니다.")
        return [];
      }
    })
    .then(data => {
      setParameterId(data);
      handleItemSelect(data);
      console.log(data);
    })
    
  }, []);

const handleItemSelect = (fileId) => {
  const videoElement = document.getElementById('videoPlayer');
  videoElement.src = `${apiUrl}/play-video2?fileId=${fileId}`;
  setParameterId(fileId);
  
};
const handleScreenBlock = () => {
  const element_screen = document.querySelector('.screenInfo'); // abc 클래스를 가진 요소 선택
  const element_menu   = document.querySelector('.menuInfo');
  

  if (element_screen) {
    if (element_screen.style.display === 'block') {
      element_screen.style.display = 'none'; // display 속성을 none으로 설정하여 숨김
    } else {
      element_menu.style.display = 'none';
      element_screen.style.display = 'block'; // display 속성을 block으로 설정하여 표시
    }
  }
}

const handleMenuBlock = () => {
  const element_screen = document.querySelector('.screenInfo'); // abc 클래스를 가진 요소 선택
  const element_menu = document.querySelector('.menuInfo');

  

  if (element_menu) {
    if (element_menu.style.display === 'block') {
      element_menu.style.display = 'none'; // display 속성을 none으로 설정하여 숨김
    } else {
      element_screen.style.display = 'none';
      element_menu.style.display = 'block'; // display 속성을 block으로 설정하여 표시
    }
  }
}


  return (
    <div className="mobile-video-player">
      <div className="phone-container">
        <div className="phone">
          <div className="screen">
            <div className='videoTop'>
            <p>매장 정보</p>
            <p onClick={handleMenuBlock}>메뉴판</p>
            <p onClick={handleScreenBlock}>영상 목록</p>
            </div>
            <video id="videoPlayer" className="player" controls loop autoPlay width='100%' height='100%'>
              Your browser does not support the video tag.
              <button>스페샬!</button>
            </video>
          </div>
        </div>
          <ScreenInfo onItemSelect={handleItemSelect} /> 
          <MenuInfo parameterId={parameterId}  />
      </div>
    </div>
  );
}

export default MainMediaContents;
