import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginStateSlice, { getLoginFailed, getLoginSuccess } from '../redux/authReducer';

function ScreenInfo({ onItemSelect }) {

  let apiUrl = process.env.REACT_APP_PROD_API_URL;
  const accessToken = localStorage.getItem('token');
  const [fileInfo, setFileInfo] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/file-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json(); 
      } else {
        console.log("파일정보를 불러오지 못했습니다.")
        return [];
      }
    })
    .then(data => {
      setFileInfo(data.map((item, index) => ({
        fileId: item.id,
        address: item.address,
        videoTitle: item.videoTitle
      })));
      console.log(data);
    })
  }, [accessToken, apiUrl]);

  const handleItemClick = (fileId) => {
    console.log(fileId);
    onItemSelect(fileId);
  };

  return (
    <div className='screenInfo'>
      <ul>
        {fileInfo.length > 0 ? 
          fileInfo.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item.fileId)}>
              <div>
                {/* <img src='../images/google_logo.png'></img> */}
              </div>
              <div>
                <p>{item.videoTitle}</p>
              </div>
              <div>
                <p>{item.address}</p>
              </div>
            </li>
          )) 
          : 
          <li>No files available</li>
        }
      </ul>
    </div>
  );
}

export default ScreenInfo;
