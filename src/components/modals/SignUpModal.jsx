import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import PostCode from '../PostCode';

function SignUpModal({show, onHide}) {

  const defaultInfo = {
    id: '',
    pw: '',
    pwCheck: '',
    nickname: '',
    address: {
      zonecode: '',
      fullAddress: '',
      detailAddress: ''
    }
  };
  const [signUpInfo, setSignUpInfo] = useState(defaultInfo);

  const handleInputChange = (e, key) => {
    setSignUpInfo((prevData) => ({
      ...prevData,
      [key]: e.target.value,
      address: {
        ...prevData.address,
        detailAddress: key === 'detailAddress' ? e.target.value : prevData.address.detailAddress,
      },
    }));
  };
  
  const handleAddressSelected = (zonecode, fullAddress) => {
    setSignUpInfo((prevData) => ({
      ...prevData,
      address: {
        zonecode: zonecode,
        fullAddress: fullAddress,
        detailAddress: prevData.address.detailAddress
      }
    }));
  };

  const handleClose = () => {
    onHide();
    setSignUpInfo(defaultInfo);
  };

  const handleConfirmClick = () => {
    // 미입력 시 경고 메시지 추가
    if (!signUpInfo.id || !signUpInfo.pw || !signUpInfo.pwCheck || !signUpInfo.nickname || !signUpInfo.address.zonecode || 
      !signUpInfo.address.fullAddress || !signUpInfo.address.detailAddress) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    // 비밀번호 일치 여부 확인
    if (signUpInfo.pw !== signUpInfo.pwCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 함수(DB로 데이터보내기)


    // 초기화 및 종료.
    handleSignUp();
    alert('회원가입 완료');
    onHide();
    setSignUpInfo(defaultInfo);
  };

// 회원가입 user 스테이트
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    address: '',
    detailedAddress: '',
  });

// INPUT-value값 다루는 함수 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

// 회원가입 처리 로직 서버 데이터로 전송하는 함수
  const handleSignUp = () => {
    // 간단한 클라이언트 측 유효성 검사
    if (!userData.username || !userData.password || !userData.confirmPassword || 
        userData.password !== userData.confirmPassword) {
      alert('입력값이 올바르지 않습니다.');
      return;
    }

    // 서버로 회원가입 정보 전송
    axios.post('http://localhost:3001/signup', userData)
      .then(response => {
        // 서버로부터의 응답 처리
        if (response.data.success) {
          setUserData({
            username: '',
            password: '',
            confirmPassword: '',
            name: '',
            address: '',
            detailedAddress: '',
            authority: 'user',
            icon: 'null'
          });
          alert('회원가입 성공!');
          onHide(); // 모달 닫기
        } else {
          alert('회원가입 실패: ' + response.data.error);
        }
      })
      .catch(error => {
        console.error('회원가입 오류:', error);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" 
                        style={{display: 'flex', width: '100%', height: '40px'}}>
            <p style={{flexBasis:'30%'}}>계정 생성</p>
            <div style={{flexBasis:'100%'}}>
              <button style={{float : 'right', border: 'none', background: 'none'}} onClick={handleClose}>X</button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control value={signUpInfo.id} type="text" placeholder="아이디"
                            onChange={(e) => handleInputChange(e, 'id')}
                            style={{marginBottom: '15px'}}/>
              <Form.Control value={signUpInfo.pw} type="password" placeholder="비밀번호" 
                            onChange={(e) => handleInputChange(e, 'pw')}
                            style={{marginBottom: '15px'}}/>
              <Form.Control value={signUpInfo.pwCheck} type="password" placeholder="비밀번호 확인" 
                            onChange={(e) => handleInputChange(e, 'pwCheck')}
                            style={{marginBottom: '15px'}}/>
              { signUpInfo.pw !== signUpInfo.pwCheck&& <p style={{color: 'red', marginLeft: '10px'}}>비밀번호가 일치하지 않습니다.</p>}
              <Form.Control value={signUpInfo.nickname} type="text" placeholder="별명" 
                            onChange={(e) => handleInputChange(e, 'nickname')}
                            style={{marginBottom: '15px'}}/>
              <PostCode onAddressSelected={handleAddressSelected} 
                        inputForm={<>
                          <Form.Control value={signUpInfo.address.zonecode} type="text" placeholder="우편번호" 
                                        style={{marginBottom: '15px'}}/>
                          <Form.Control value={signUpInfo.address.fullAddress} type="text" placeholder="주소" 
                                        style={{marginBottom: '15px'}}/>              
                        </>}/>
              <Form.Control value={signUpInfo.address.detailAddress} type="text" placeholder="상세주소" 
                            onChange={(e) => handleInputChange(e, 'detailAddress')}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* 회원가입 버튼에 handleSignUp > handleConfirmClick 기능 적용 */}
          <Button variant="danger" type="button" style={{width: '100%'}} onClick={handleConfirmClick}>회원가입</Button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
}

export default SignUpModal;