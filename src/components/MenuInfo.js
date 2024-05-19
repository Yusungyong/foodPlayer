import React, { useEffect, useState } from 'react';

function MenuInfo({parameterId}) {

  const accessToken = localStorage.getItem('token');
  let   apiUrl = process.env.REACT_APP_PROD_API_URL;
  const [menuInfo, setMenuInfo] = useState([]);


  useEffect(() => {
    fetch(`${apiUrl}/menuList?fileId=${parameterId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {

        if (response.ok) {
          return response.json(); 
        } else {
          console.log("파일정보를 불러오지 못했습니다.");
          return [];
        }

    })
    .then(data => {
      console.log(data);
      let transformedData = []
      // 데이터가 존재하는 경우에만 처리
      if (data && data.length > 0) {

        // 데이터를 적절히 변형하여 새로운 배열로 설정
        transformedData = data.map(item => ({
          type: item.type,
          name: item.name,
          price: item.price
        }));
        
      }
      setMenuInfo(transformedData);
    });
    
  }, [parameterId]);
  


  return (
    <div className='menuInfo'>
      <div className='main'>
        <h3>Main Menu</h3>
        {menuInfo.map((item, index) => (
          item.type === 'main' && (
            <div key={index}>
              <p className='menuNames'> {item.name}</p>
              <p>{new Intl.NumberFormat().format(item.price)} 원</p>
            </div>
          )
        ))}
      </div>
      <div className='side'>
        <h3>Side Menu</h3>
        {menuInfo.map((item, index) => (
          item.type === 'side' && (
            <div key={index}>
              <p className='menuNames'> {item.name}</p>
              <p>{new Intl.NumberFormat().format(item.price)} 원</p>
            </div>
          )
        ))}
      </div>
      <div className='orthers'>
        <h3>Other Menu</h3>
        {menuInfo.map((item, index) => (
          item.type === 'orthers' && (
            <div key={index}>
              <p className='menuNames'> {item.name}</p>
              <p>{new Intl.NumberFormat().format(item.price)} 원</p>
            </div>
          )
        ))}
      </div>
    </div>

  );
}

export default MenuInfo;
