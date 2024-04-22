import React, { useState } from 'react';

function FileUpload() {

    const formData = new FormData();


    const [videoFile, setVideoFile] = useState('');
    const [formVideo, setFormVideo] = useState('');
    const [address, setAddress] = useState('');
    const [score_1, setScore_1] = useState('');
    const [score_2, setScore_2] = useState('');
    const [score_3, setScore_3] = useState('');
    const [score_4, setScore_4] = useState('');
    const [score_5, setScore_5] = useState('');
    const [score_6, setScore_6] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const username = localStorage.getItem('username');
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setVideoFile(URL.createObjectURL(selectedFile));
        setFormVideo(selectedFile);
    };

    const handleSubmit = () => {
        console.log('videoFile :    ', videoFile);
        console.log('videoTitle :   ', videoTitle);
        console.log('address :   ', address);
        console.log('username :     ', username);
        const uploadFileInfo = {
            "videoTitle" : videoTitle ,
            "address" : address ,
            "userName" : username , 
            "score1" : score_1 ,
            "score2" : score_2 ,
            "score3" : score_3 ,
            "score4" : score_4 ,
            "score5" : score_5 ,
            "score6" : score_6 ,
        } 
        formData.append("file", formVideo);
        formData.append("fileVO", JSON.stringify(uploadFileInfo));
        const accessToken = localStorage.getItem("token");
        // 여기에 fetch API를 사용하여 서버로 데이터를 전송하는 코드를 작성합니다.
        fetch('http://localhost:8080/file-upload', {
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
                <div className="fileUpload">
                    <label id="score_1">
                        <input type="number" id="score_1" name="score_1" value={score_1} placeholder='맛' onChange={(e) => setScore_1(e.target.value)} />

                    </label>
                </div>
                <div className="fileUpload">
                    <label id="score_2">
                        <input type="number" id="score_2" name="score_2" value={score_2} placeholder='비주얼' onChange={(e) => setScore_2(e.target.value)} />

                    </label>
                </div>
                <div className="fileUpload">
                    <label id="score_3">
                        <input type="number" id="score_3" name="score_3" value={score_3} placeholder='서비스' onChange={(e) => setScore_3(e.target.value)} />

                    </label>
                </div>
                <div className="fileUpload">
                    <label id="score_4">
                        <input type="number" id="score_4" name="score_4" value={score_4} placeholder='접근성' onChange={(e) => setScore_4(e.target.value)} />

                    </label>
                </div>
                <div className="fileUpload">
                    <label id="score_5">
                        <input type="number" id="score_5" name="score_5" value={score_5} placeholder='가성비' onChange={(e) => setScore_5(e.target.value)} />

                    </label>
                </div>
                <div className="fileUpload">
                    <label id="score_6">
                        <input type="number" id="score_6" name="score_6" value={score_6} placeholder='기타점수' onChange={(e) => setScore_6(e.target.value)} />

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
