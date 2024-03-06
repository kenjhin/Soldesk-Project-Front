import React, { useRef, useState, useEffect } from 'react';
import myInfoIco from "../../assets/img/home/nav-icon-profile.png";
import PostCode from '../PostCode';
import "../../styles/MyInfoModal.css";
import axios from 'axios';

const MyInfoModal = ({ data, setData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  // const [prevData, setPrevData] = useState({
  //   id: '',
  //   pw: '',
  //   pwCheck: '',
  //   nickname: '',
  //   address: {
  //     zonecode: '',
  //     fullAddress: '',
  //     detailAddress: '',
  //   },
  // });

  // useEffect(() => {
  //   // 서버에서 사용자 정보를 가져오는 비동기 함수
  //   const fetchUserData = async () => {
  //     try {
  //       // axios로 서버에 요청하여 사용자 정보를 가져오기
  //       const response = await axios.get('http://localhost:3001/getUserInfo', { withCredentials: true });
  //       const userData = response.data.userInfo; // 서버에서 받아온 데이터 구조에 따라 수정
        
  //       setPrevData(userData);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   // 컴포넌트가 마운트될 때 서버에서 데이터를 가져오기
  //   fetchUserData();
  // }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행되도록 함


  const [prevData, setPrevData] = useState();
  const handleOpen = () => {
    setPrevData(data);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e, key) => {
    if(key!=='detailAddress'){
      setPrevData(() => ({
        ...prevData,
        [key]: e.target.value,
      }));
    }else{
      setPrevData(() => ({
        ...prevData,
        address: {
          ...prevData.address,
          detailAddress: e.target.value,
        },
      }));
    }
  };

  const handleConfirmClick = () => {
    // 미입력 시 경고 메시지 추가
    if (!prevData.username || !prevData.password || !prevData.confirmPassword || !prevData.nickname || !prevData.address.zonecode || 
        !prevData.address.fullAddress || !prevData.address.detailAddress) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    // 비밀번호 일치 여부 확인
    if (prevData.password !== prevData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // prevData의 address의 데이터 사이에 !!을 넣어서 합쳐주고 setData
    setData(prevData);
    // DB에 전송하기 data << 이거 보내면 됨
    // DB전송함수
    alert('저장되었습니다.')

  };

  const handleAddressSelected = (zonecode, fullAddress) => {
    setPrevData(() => ({
      ...prevData,
      address: {
        zonecode: zonecode,
        fullAddress: fullAddress,
        detailAddress: prevData.address.detailAddress,
      }
    }));
  };

  return (
    <>
      <div>
        <button
          className="myInfoBtn mouseover"
          onClick={() => handleOpen()}
        >
          <img src={myInfoIco} alt="" />
        </button>
      </div>
      {modalOpen && (
        <div
          className="myInfo-container"
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              handleClose();
            }
          }}
        >
          <div className="myInfo-content">
            <div className="myInfoBox">
              <h1>MY INFO</h1>
              <div className="myInfo-1">
                <input defaultValue={prevData.username} style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} 
                        readOnly spellCheck="false"/>
                <input value={prevData.password} type="password" placeholder="비밀번호" 
                        onChange={(e) => handleInputChange(e, 'password')}/>
                <input value={prevData.confirmPassword} type="password" placeholder="비밀번호 확인" 
                        style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}} 
                        onChange={(e) => handleInputChange(e, 'confirmPassword')}/>
                  {prevData.password!==prevData.confirmPassword && 
                    <p style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</p>}
              </div>
              <div className="myInfo-2">
                <input
                  value={prevData.nickname}
                  readOnly
                  spellCheck="false"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />

                <PostCode
                  onAddressSelected={handleAddressSelected}
                  inputForm={
                    <>
                      <input
                        value={prevData.address.zonecode}
                        spellCheck="false"
                        readOnly
                      />
                      <input
                        value={prevData.address.fullAddress}
                        spellCheck="false"
                        readOnly
                      />
                    </>
                  }
                />
                <input
                  value={prevData.address.detailAddress}
                  spellCheck="false"
                  style={{
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  onChange={(e) => handleInputChange(e, "detailAddress")}
                />
              </div>
              <button onClick={handleConfirmClick}>확인</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyInfoModal;