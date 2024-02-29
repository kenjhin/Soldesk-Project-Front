import React, { useRef, useState } from 'react';
import myInfoIco from "../../assets/img/home/nav-icon-profile.png";
import PostCode from '../PostCode';
import "../../styles/MyInfoModal.css";

const MyInfoModal = ({data, setData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [prevData, setPrevData] = useState();
  
  const handleOpen = () => {
    setPrevData(data);
    setModalOpen(true);
  }

  const handleClose = () => {
    setPrevData(data);
    setModalOpen(false);
  };

  // // input에 value값 할당했을 때 입력으로 값 변경하기 위한 함수
  const handleInputChange = (e, key) => {
    setPrevData((prevUserInfo) => ({
      ...prevUserInfo,
      [key]: e.target.value,
      address: {
        ...prevUserInfo.address,
        detailAddress: key === 'detailAddress' ? e.target.value : prevUserInfo.address.detailAddress,
      },
    }));
  };

  // 확인
  const handleConfirmClick = () => {
    // 미입력 시 경고 메시지 추가
    if (!prevData.id || !prevData.pw || !prevData.pwCheck || !prevData.nickname || !prevData.address.zonecode || 
        !prevData.address.fullAddress || !prevData.address.detailAddress) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    // 비밀번호 일치 여부 확인
    if (prevData.pw !== prevData.pwCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setData(prevData);
    alert('저장되었습니다.')
  };

  // 주소 선택시 저장
  const handleAddressSelected = (zonecode, fullAddress) => {

    setPrevData((prevUserInfo) => ({
      ...prevUserInfo,
      address: {
        zonecode: zonecode,
        fullAddress: fullAddress,
        detailAddress: prevData.address.detailAddress
      }
    }));
  };

  return (
    <>
      <div>
        <button className="myInfoBtn mouseover" onClick={() => handleOpen()}>
            <img src={myInfoIco} alt="" />
        </button>
      </div>
      {
        modalOpen &&
        <div className="myInfo-container" ref={modalBackground} onClick={e => {
          if (e.target === modalBackground.current) {
            handleClose();
          }
        }}>
          <div className="myInfo-content">
          <div className="myInfoBox">
                        <h1>MY INFO</h1>
                        <div className="myInfo-1">
                          <input defaultValue={prevData.id} style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} 
                                  readOnly spellCheck="false"/>
                          <input value={prevData.pw} type="password" placeholder="비밀번호" 
                                  onChange={(e) => handleInputChange(e, 'pw')}/>
                          <input value={prevData.pwCheck} type="password" placeholder="비밀번호 확인" 
                                  style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}} 
                                  onChange={(e) => handleInputChange(e, 'pwCheck')}/>
                            {prevData.pw!==prevData.pwCheck && 
                              <p style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</p>}
                        </div>
                        <div className="myInfo-2">
                          <input defaultValue={prevData.nickname} readOnly spellCheck="false" 
                                  style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}/>
                          <PostCode onAddressSelected={handleAddressSelected} 
                                    value1={prevData.address.zonecode} value2={prevData.address.fullAddress}/>
                          <input value={prevData.address.detailAddress} spellCheck="false"
                            style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}
                            onChange={(e) => handleInputChange(e, 'detailAddress')}/>
                        </div>
                        <button onClick={handleConfirmClick}>확인</button>
                      </div>
          </div>
        </div>
      }
    </>
  )
}

export default MyInfoModal