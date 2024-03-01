import { Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios'; // axios 추가
import { useState } from 'react'; // useState 추가

function SignUpModal({ show, onHide }) {
  // useState를 사용하여 각 입력 필드의 값을 관리
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    address: '',
    detailedAddress: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 기존의 formData를 복제하고 변경된 필드만 갱신
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    // 서버로 회원가입 정보 전송
    axios.post('http://localhost:3001/signup', formData)
      .then(response => {
        if (response.data.success) {
          // 회원가입 성공 시 다양한 처리 가능
          console.log('회원가입 성공!');
          alert('회원가입 성공')
        } else {
          // 회원가입 실패 시 메시지 표시 또는 다른 처리
          console.error('회원가입 실패:', response.data.error);
          alert('회원가입 오류')
        }
      })
      .catch(error => {
        console.error('회원가입 중 오류:', error);
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
            {/* id 제거, name 속성 추가 */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="아이디"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="비밀번호"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="비밀번호 확인"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="별명"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="주소"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="상세주소"
                name="detailedAddress"
                value={formData.detailedAddress}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* onClick 이벤트 추가 */}
          <Button
            variant="danger"
            type="button"
            style={{ width: '100%' }}
            onClick={handleSignUp}
          >
            회원가입
          </Button>
        </Modal.Footer>
        {/* <HorizontalLine text={""}/> */}
      </Container>
    </Modal>
  );
}

export default SignUpModal;