import React, {useState, useRef} from 'react'
import "../../styles/IconSetModal.css";

const IconSetModal = ({img, content}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  return (
    <>
      <div className="icon-modal-btn-wrapper">
        <button className="icon-modal-open-btn" onClick={() => setModalOpen(true)}>
          {img}
        </button>
      </div>
      {
        modalOpen &&
        <div className="icon-modal-container" ref={modalBackground} onClick={e => {
          if (e.target === modalBackground.current) {
            setModalOpen(false);
          }
        }}>
          <div className="icon-modal-content">
            {content}
          </div>
        </div>
      }
    </>
  );
}

export default IconSetModal