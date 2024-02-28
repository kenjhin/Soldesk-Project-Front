import React, {useState, useRef} from 'react'
import myInfoIco from "../../assets/img/home/nav-icon-profile.png";
import "../../styles/MyInfoModal.css";

const MyInfoModal = ({content}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  return (
    <>
      <div>
        <button className="myInfoBtn mouseover" onClick={() => setModalOpen(true)}>
            <img src={myInfoIco} alt="" />
        </button>
      </div>
      {
        modalOpen &&
        <div className="myInfo-container" ref={modalBackground} onClick={e => {
          if (e.target === modalBackground.current) {
            setModalOpen(false);
          }
        }}>
          <div className="myInfo-content">
            {content}
          </div>
        </div>
      }
    </>
  )
}

export default MyInfoModal