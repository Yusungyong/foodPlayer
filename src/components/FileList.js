import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FileList() {
    const navigate = useNavigate();
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
        if(fileInfo.length === 0){
          setFileInfo(data);
          console.log(data);
          data.forEach(item => {
            fetch(`${apiUrl}/images?fileId=${item.id}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
            }).then(response => {
              if (response.ok) {
                return response.blob(); 
              } else {
                console.error('Failed to fetch images:', response.status);
                return null;
              }
            })
            .then(blob => {
              if (blob) {
                const imageUrl = URL.createObjectURL(blob);
                const img = document.createElement('img');
                img.src = imageUrl;
                const listItem = document.getElementById(`li-${item.id}`);
                if (listItem) {
                  listItem.querySelector('div').append(img);
                }
              }
            })
            .catch(error => {
              console.error('Error fetching images:', error);
            });
          });
        }
  
      })
    }, [accessToken, apiUrl]);

    const handleItemClick = (fileId) => {
        navigate(`/FileDetail/${fileId}`);
    };
    
    const handleDeleteItem = (event, fileId) => {
      event.stopPropagation();
      const confirmed = confirm("정말로 삭제하시겠습니까?");
      if (confirmed) {
        fetch(`http://localhost:8080/deleteItem?fileId=${fileId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(response => {
          if (response.ok) {
            setFileInfo(prevFileInfo => prevFileInfo.filter(item => item.id !== fileId));
            console.log(`File with ID ${fileId} deleted successfully.`);
          } else {
            console.error('Failed to delete the file:', response.status);
          }
        })
        .catch(error => {
          console.error('Error deleting the file:', error);
        });
      }
    }
    
    return (
      <div className='fileList'>
        <ul className='fileInfo'>
          {fileInfo.length > 0 ? 
            fileInfo.map((item, index) => (
              <li key={item.id} id={`li-${item.id}`} onClick={() => handleItemClick(item.id)}>
                <div>
                </div>
                <div>
                  <p>{item.videoTitle}</p>
                  <p>{item.address}</p>
                  
                </div>
                <div className='deleteItem'><p onClick={(event) => handleDeleteItem(event, item.id)}>삭제</p></div>
              </li>
            )) 
            : 
            <li>No files available</li>
          }
        </ul>
      </div>
    );
  }
export default FileList;
