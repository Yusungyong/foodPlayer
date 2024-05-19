import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function FileUpload() {
    console.log("FileUpload : " , localStorage.getItem('token'));
    const navigator = useNavigate();
    const formData = new FormData();
    let apiUrl = process.env.REACT_APP_PROD_API_URL;
    const accessToken = localStorage.getItem('token');
    // alert(accessToken);
    const [videoFile, setVideoFile] = useState('');
    const [formVideo, setFormVideo] = useState('');
    const [address, setAddress] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const username = localStorage.getItem('username');
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setVideoFile(URL.createObjectURL(selectedFile));
        setFormVideo(selectedFile);
    };

    const handleSubmit = () => {
        console.log('accessToken : ' , accessToken);
        console.log('videoFile :    ', videoFile);
        console.log('videoTitle :   ', videoTitle);
        console.log('address :   ', address);
        console.log('username :     ', username);
        const uploadFileInfo = {
            "videoTitle" : videoTitle ,
            "address" : address ,
            "userName" : username 
        } 
        formData.append("file", formVideo);
        formData.append("fileVO", JSON.stringify(uploadFileInfo));
        
        // 여기에 fetch API를 사용하여 서버로 데이터를 전송하는 코드를 작성합니다.
        fetch(`${apiUrl}/file-upload`, {
            method: 'POST',
            body: formData,
            headers: {
                     'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log('Server response:', data);
            navigator("/mediaMain");
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    return (
        <div className="fileUploadContents">
            <div>
                {videoFile && <video className="preview-video" src={videoFile} controls width="350px" />}
            </div>
            <div className='fileUploadInputGrp'>
                <div className="fileUpload">
                    <label id="videoFile">
                        <input type="file" id="videoFile" name="videoFile" defaultValue={videoFile} placeholder='동영상 파일을 등록해주세요.' onChange={handleFileChange} />

                    </label>
                </div>
                <div className="fileUpload" >
                    <label id="videoTitle">
                        <input type="text" id="videoTitle" name="videoTitle" value={videoTitle} placeholder='영상의 제목을 입력해주세요.' onChange={(e) => setVideoTitle(e.target.value)} />

                    </label>
                </div>
                <div className="fileUpload" >
                    <label id="address">
                        <input type="text" id="address" name="address" value={address} placeholder='식당의 위치를 입력해주세요.' onChange={(e) => setAddress(e.target.value)} />

                    </label>
                </div>

                <div className='fileUploadSubmitBtn'>
                    <button onClick={handleSubmit}>파일 업로드</button>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;
