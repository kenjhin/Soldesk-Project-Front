import {Button, Modal, Form, Container} from 'react-bootstrap';
import HorizontalLine from "../HorizonLine.jsx";

function SignUpModal({show, onHide}) {
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
              <Form.Control type="text" placeholder="아이디"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="비밀번호" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="비밀번호 확인" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="별명" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="주소" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="상세주소" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="button" style={{width: '100%'}}>회원가입</Button>
        </Modal.Footer>
        {/* <HorizontalLine text={""}/> */}
      </Container>
    </Modal>
  );
}

export default SignUpModal;