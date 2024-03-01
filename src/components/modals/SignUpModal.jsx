import {Button, Modal, Form, Container} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function SignUpModal({show, onHide}) {




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
        if (!userData.username || !userData.password || !userData.confirmPassword || userData.password !== userData.confirmPassword) {
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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            계정 생성
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="아이디" name="username" onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="비밀번호" name="password" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="비밀번호 확인" name="confirmPassword" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="별명" name="name" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="주소" name="address" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="상세주소" name="detailedAddress" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* 회원가입 버튼에 handleSignUp 기능 적용 */}
          <Button variant="danger" type="button" style={{width: '100%'}} onClick={handleSignUp}>회원가입</Button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
}

export default SignUpModal;