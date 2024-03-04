import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import PostCode from '../PostCode';

function SignUpModal({show, onHide}) {

  const defaultInfo = {
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    address: {
      zonecode: '',
      fullAddress: '',
      detailAddress: ''
    }
  };

  const [signUpInfo, setSignUpInfo] = useState(defaultInfo);
  // 회원가입 user 스테이트
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    address: '',
  });

  const handleInputChange = (e, key) => {
    if(key!=='detailAddress'){
      setSignUpInfo(() => ({
        ...signUpInfo,
        [key]: e.target.value,
      }));
    }else{
      setSignUpInfo(() => ({
        ...signUpInfo,
        address: {
          ...signUpInfo.address,
          detailAddress: e.target.value,
        },
      }));
    }
  };
  
  const handleAddressSelected = (zonecode, fullAddress) => {
    setSignUpInfo((signUpInfo) => ({
      ...signUpInfo,
      address: {
        zonecode: zonecode,
        fullAddress: fullAddress,
        detailAddress: signUpInfo.address.detailAddress
      }
    }));
  };

  const handleClose = () => {
    onHide();
    setSignUpInfo(defaultInfo);
  };

  const handleConfirmClick = () => {
    // 미입력 시 경고 메시지 추가
    if (!signUpInfo.username || !signUpInfo.password || !signUpInfo.confirmPassword || !signUpInfo.nickname || !signUpInfo.address.zonecode || 
      !signUpInfo.address.fullAddress || !signUpInfo.address.detailAddress) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    // 비밀번호 일치 여부 확인
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 함수(DB로 데이터보내기)
    setUserData(() =>({
      ...signUpInfo,
      address: [signUpInfo.address.zonecode, signUpInfo.address.fullAddress, signUpInfo.address.detailAddress].join('!!'),
    }))

    // 초기화 및 종료.
    handleSignUp();
    alert('회원가입 완료');
    onHide();
    setSignUpInfo(defaultInfo);
  };



// INPUT-value값 다루는 함수 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((signUpInfo) => ({
      ...signUpInfo,
      [name]: value,
    }));
  };

// 회원가입 처리 로직 서버 데이터로 전송하는 함수
  const handleSignUp = () => {
    // 위에서 완료
    // // 간단한 클라이언트 측 유효성 검사
    // if (!userData.username || !userData.password || !userData.confirmPassword || 
    //     userData.password !== userData.confirmPassword) {
    //   alert('입력값이 올바르지 않습니다.');
    //   return;
    // }

    // 서버로 회원가입 정보 전송
    axios.post('http://localhost:3001/signup', userData)
      .then(response => {
        // 서버로부터의 응답 처리
        if (response.data.success) {
          setSignUpInfo({
            username: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            address: '',
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

    // 초기화 및 종료.
    
    alert('회원가입 완료');
    onHide();
    setSignUpInfo(defaultInfo);
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
              <Form.Control value={signUpInfo.username} type="text" placeholder="아이디"
                            onChange={(e) => handleInputChange(e, 'username')}
                            style={{marginBottom: '15px'}}/>
              <Form.Control value={signUpInfo.password} type="password" placeholder="비밀번호" 
                            onChange={(e) => handleInputChange(e, 'password')}
                            style={{marginBottom: '15px'}}/>
              <Form.Control value={signUpInfo.confirmPassword} type="password" placeholder="비밀번호 확인" 
                            onChange={(e) => handleInputChange(e, 'confirmPassword')}
                            style={{marginBottom: '15px'}}/>
              { signUpInfo.password !== signUpInfo.confirmPassword&& <p style={{color: 'red', marginLeft: '10px'}}>비밀번호가 일치하지 않습니다.</p>}
              <Form.Control value={signUpInfo.nickname} type="text" placeholder="별명" 
                            onChange={(e) => handleInputChange(e, 'nickname')}
                            style={{marginBottom: '15px'}}/>
              <PostCode onAddressSelected={handleAddressSelected}
                          
                        inputForm={<>
                          <Form.Control value={signUpInfo.address.zonecode}  type="text" placeholder="우편번호" 
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