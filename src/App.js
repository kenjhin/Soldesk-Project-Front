/* eslint-disable */
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// css
import "./styles/App.css";

// img
import storeIco from "./assets/img/home/nav-icon-store.png";
import myInfoIco from "./assets/img/home/nav-icon-profile.png";
import inventoryIco from "./assets/img/home/nav-icon-collections.png";
import hamster from "./assets/img/hamster.jpg";
import addPerson from "./assets/img/home/add_person_mask.png";
import addFolder from "./assets/img/home/add_folder_mask.png";
import search from "./assets/img/home/search_mask.png";
import sort from "./assets/img/home/sort_mask.png";
// fonts
import nbg from "./assets/font/NanumBarunGothic.ttf";
import nbgB from "./assets/font/NanumBarunGothicBold.ttf";
import nbgL from "./assets/font/NanumBarunGothicLight.ttf";
import nbgUL from "./assets/font/NanumBarunGothicUltraLight.ttf";
// pages
import Login from "./pages/Login"
import Main from "./pages/Main"
import IconSetModal from './components/modals/IconSetModal';
import Board from './pages/Board'

function App() {
  const [logined, setLogined] = useState(true);
  const [icon, setIcon] = useState(hamster);
  const [icons, setIcons] = useState([hamster, hamster]);
  const [nickname, setNickname] = useState('유저닉네임');
  const [profileMessage, setProfileMessage] = useState('상태메시지');
  const [status, setStatus] = useState();
  
  return (
    <>
      <Routes>
        {/* <Route paht="/"/>    로그인 세션이 유효하면 home으로 연결, 유효하지 않으면 login으로 연결 */}
        <Route path="/login" 
          element={
            <>
              <Login/>
            </>
          }
        />

        <Route
          path="/*"
          element={
            // 로그인되어있으면 그대로(완료), 안되어있으면 /login으로 보내줘야함(미완)
            logined &&
            <div className="homeBody">
              <header className="header">
                <div className="headerBtnBox">
                  <div className="leftBtnBox">
                    <button className="noticeBtn mouseover">!</button>
                    <button className="homeBtn mouseover">홈</button>
                    <button className="boardBtn mouseover">자유게시판</button>
                    <button className="boardBtn mouseover">인기게시판</button>
                    <button className="boardBtn mouseover">이슈게시판</button>
                    <button className="boardBtn mouseover">기념게시판</button>
                    <button className="boardBtn mouseover">기모띵게시판</button>
                  </div>
                  <div className="rightBtnBox">
                    <button className="myInfoBtn mouseover">
                      <img src={myInfoIco} alt="" />
                    </button>
                    <button className="inventoryBtn mouseover">
                      <img src={inventoryIco} alt="" />
                    </button>
                    <button className="storeBtn mouseover">
                      <img src={storeIco} alt="" />
                    </button>
                  </div>
                </div>
                <div className="headerProfileBox">
                  {/* hamster에 현재 로그인한 계정의 아이콘 받아오기 */}
                  <IconSetModal img={<img className="userIcon" src={icon} alt="" />}
                    modal_content={
                      <div className="iconModal">
                        <div className="iconModalLeftBox">
                          <img src={icon} alt=""/>
                          <p>{nickname}</p>
                        </div>
                        <div className="iconModalRightBox">
                          <div className="iconModalTitle">
                            <p>아이콘 설정</p>
                          </div>
                          <div className="iconSelectArea">
                            {
                              icons.map(function(a, i){
                                return (
                                  <div className="iconsBox">
                                    {/* 눌렀을 때 icon=icons[i]로 바꾸기 */}
                                    <img src={icons[i]}/>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                    }/>
                  <div className="nameBox">
                    <p className="nickname">{nickname}</p>
                    <p className="profileMessage">"{profileMessage}"</p>
                  </div>
                </div>
              </header>

              <main className="main">
                <div className="messenger">
                  <p className="messengerText">커뮤니티</p>
                  <button className="messengerBtn"><img className="messengerBtn" src={search}/></button>
                  <button className="messengerBtn"><img className="messengerBtn" src={sort}/></button>
                  <button className="messengerBtn"><img className="messengerBtn" src={addFolder}/></button>
                  <button className="messengerBtn"><img className="messengerBtn" src={addPerson}/></button>
                </div>
                <Main/>
              </main>

              <footer>

              </footer>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
