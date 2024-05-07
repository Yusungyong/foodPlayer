import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

function FileDetail(){
    const { fileId } = useParams();
    let apiUrl = process.env.REACT_APP_PROD_API_URL;
    const accessToken = localStorage.getItem('token');
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const addedInputsRef = useRef([]);
    let firstInputAddYn = false;

    const handleMenuAdd = (menuType) => {
        if(!firstInputAddYn){
            addedInputsRef.current.push({
                menuNameRef: document.getElementById("mainName"),
                menuPriceRef: document.getElementById("mainPrice"),
                menuTypeRef: 'main'
            });
            firstInputAddYn = true;
        }

        const menuAdd = document.getElementById(menuType);
        const divElement = document.createElement("div");
        
        // 첫 번째 input 태그 추가
        const inputElement1 = document.createElement("input");
        inputElement1.type = "text";
        inputElement1.placeholder = "메뉴 이름";
    
        // 두 번째 input 태그 추가
        const inputElement2 = document.createElement("input");
        inputElement2.type = "number";
        inputElement2.placeholder = "가격";
    
        // div 태그에 input 태그 추가
        divElement.appendChild(inputElement1);
        divElement.appendChild(inputElement2);
    
        // fileUpdate div 태그에 새로운 div 태그 추가
        menuAdd.insertBefore(divElement, document.querySelector(`.${menuType}Add`));

        // 추가된 input 요소에 대한 참조 저장
        addedInputsRef.current.push({
            menuNameRef: inputElement1,
            menuPriceRef: inputElement2,
            menuTypeRef: menuType
        });
    }
    
    const handleMenuSave = (saveType) => {
        console.log(addedInputsRef);
        let menuSaveInfo = []
        // 추가된 input 요소에 입력된 값 가져오기
        addedInputsRef.current.forEach((inputRefs, index) => {
            if(saveType == inputRefs.menuTypeRef) {
                console.log(`추가된 메뉴 이름:`, inputRefs.menuNameRef.value);
                console.log(`추가된 메뉴 가격:`, inputRefs.menuPriceRef.value);
                console.log(`추가된 메뉴 가격:`, inputRefs.menuTypeRef);
                menuSaveInfo.push({
                    name: inputRefs.menuNameRef.value,
                    price: inputRefs.menuPriceRef.value,
                    type: inputRefs.menuTypeRef,
                    fileId : fileId
                });
                console.log("console.log : ", menuSaveInfo);
                

            }
        });
        fetch(`${apiUrl}/menuSave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(menuSaveInfo)
        })
        .then(response => {
            console.log("response : ", response);
        });

        
    }
    

    return (
        <div className='fileDetail'>
            <div className="fileUpdate" id="fileUpdate">
                <div className='main' id="main">
                    <h5>메인 메뉴</h5>
                    <div>
                        <input id="mainName" ref={inputRef1} type="text" placeholder="메뉴 이름" />
                        <input id="mainPrice" ref={inputRef2} type="number" placeholder="가격" />
                    </div>
                    <div className="mainAdd">
                        <button onClick={() => handleMenuAdd('main')}>추가</button>
                        <button onClick={() => handleMenuSave('main')}>저장</button>
                    </div>
                </div>
                <div className='side' id="side">
                    <h5>사이드 메뉴</h5>
                    <div className="sideAdd">
                        <button onClick={() => handleMenuAdd('side')}>추가</button>
                        <button onClick={() => handleMenuSave('side')}>저장</button>
                    </div>
                </div>
                <div className='orthers' id="orthers">
                    <h5>기타</h5>
                    <div className="orthersAdd">
                        <button onClick={() => handleMenuAdd('orthers')}>추가</button>
                        <button onClick={() => handleMenuSave('orthers')}>저장</button>
                    </div>
                </div>
            </div>
        </div>
      );
}


export default FileDetail;
