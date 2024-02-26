import React, {useState, useRef} from 'react'
import "../../styles/IconSetModal.css";

const IconSetModal = ({img, modal_content}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    return (
        <>
          <div className="btn-wrapper">
            <button className="modal-open-btn" onClick={() => setModalOpen(true)}>
              {img}
            </button>
          </div>
          {
            modalOpen &&
            <div className="modal-container" ref={modalBackground} onClick={e => {
              if (e.target === modalBackground.current) {
                setModalOpen(false);
              }
            }}>
              <div className="modal-content">
                {modal_content}
              </div>
            </div>
          }
        </>
      );
}

export default IconSetModal