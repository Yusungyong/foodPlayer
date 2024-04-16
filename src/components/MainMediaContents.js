import React, { useState, useRef } from 'react';


function MainMediaContents() {

    const accessToken = localStorage.getItem("token");
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    // fetch 함수를 사용하여 API 호출
    fetch('http://localhost:8080/test2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // accessToken을 헤더에 추가
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        return response.json(); 
    }) // JSON 형식으로 응답 받기
    .then(data => {
        console.log("data : ",data)
        localStorage.setItem("username", data.username.slice(0, 3));
        setUsername(localStorage.getItem("username"))
    }) // 응답 데이터 출력
    .catch(error => console.error('Error:', error)); // 에러 핸들링


    const videoRef = useRef(null);


    const handleDoubleClick = (event) => {
        // 더블클릭 이벤트를 처리하지 않도록 설정
        event.preventDefault();
    };



    return (
        <div className="mobile-video-player">
            <div className="phone-container">
                <div className="phone">
                    <div className="screen">
                    <video controls className="video" onDoubleClick={handleDoubleClick}>
                        <source src="./video/video_sample.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainMediaContents;
