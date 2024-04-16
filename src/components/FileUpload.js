import React, { useState } from 'react';

function FileUpload() {
    const [videoFile, setVideoFile] = useState('');
    const [videoPlace, setVideoPlace] = useState('');
    const [score_1, setScore_1] = useState('');
    const [score_2, setScore_2] = useState('');
    const [videoTitle, setVideoTitle] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setVideoFile(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = () => {
        console.log('videoFile : ', videoFile);
        console.log('videoTitle : ', videoTitle);
        console.log('videoPlace : ', videoPlace);
        console.log('score_1 : ', score_1);
        console.log('score_2 : ', score_2);
        console.log('username : ', localStorage.getItem('username'));

        // 여기에 fetch API를 사용하여 서버로 데이터를 전송하는 코드를 작성합니다.
        // fetch('http://your-server-url/videoUpload', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         videoFile: videoFile,
        //         videoTitle: videoTitle,
        //         videoPlace: videoPlace,
        //         score_1: score_1,
        //         score_2: score_2
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     console.log('Server response:', data);
        // })
        // .catch(error => {
        //     console.error('There was a problem with the fetch operation:', error);
        // });
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
                    <label id="videoPlace">
                        <input type="text" id="videoPlace" name="videoPlace" value={videoPlace} placeholder='식당의 위치를 입력해주세요.' onChange={(e) => setVideoPlace(e.target.value)} />

                    </label>
                </div>
                <div className="fileUpload">
                    <label id="score_1">
                        <input type="number" id="score_1" name="score_1" value={score_1} placeholder='접근성' onChange={(e) => setScore_1(e.target.value)} />

                    </label>
                </div>
                <div className="fileUpload">
                    <label id="score_2">
                        <input type="number" id="score_2" name="score_2" value={score_2} placeholder='맛' onChange={(e) => setScore_2(e.target.value)} />

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
