/* eslint-disable */
import React, { useState, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
// css
import "./styles/App.css";
// img
import storeIco from "./assets/img/home/nav-icon-store.png";
import inventoryIco from "./assets/img/home/nav-icon-collections.png";
import hamster from "./assets/img/hamster.jpg";
import addPerson from "./assets/img/home/add_person_mask.png";
import addFolder from "./assets/img/home/add_folder_mask.png";
import search from "./assets/img/home/search_mask.png";
import sort from "./assets/img/home/sort_mask.png";
// pages
import Login from "./pages/Login";
import Main from "./pages/Main";
import Board from './pages/Board';
// components
import IconSetModal from './components/modals/IconSetModal';
import MyInfoModal from './components/modals/MyInfoModal';
import axios from "axios";


function App() {

  // state
  const [userInfo, setUserInfo] = useState({
    logined: true,
    icon: hamster,
    icons: [hamster, hamster],
    nickname: '유저닉네임',
    profileMessage: '상태메시지',
    status: undefined,
    id: 'ID',
    pw: 'password',
    pwCheck: 'password',
    address: {
      zonecode: 'zonecode',
      fullAddress: 'fullAddress',
      detailAddress: 'detailAddress'
    }
  });
  const boardNames = ['자유게시판', '인기게시판', '이슈게시판', '기념게시판', '신고게시판'];
  const navigate = useNavigate();
  
  // 로그아웃 기능 임시 함수
  const handleLogout = () => {
    axios.post('http://localhost:3001/logout')
      .then(response => {
        if (response.data.success) {
          // 유저 세션 삭제후 Login페이지로 리다이렉트
          sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('username');
          navigate(response.data.redirectPath);

          console.log('로그아웃 확인 콘솔:', {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            username: sessionStorage.getItem('username')
          });

        } else if (response.data.sessionExpired) {
          console.log('세션이 이미 만료되었습니다.');
        } else {
          console.error('로그아웃 실패:', response.data.message);
        }
      })
      .catch(error => {
        console.error('로그아웃 요청 오류:', error);
      });
  };

  return (
    <>
      <Routes>
        {/* <Route path="/"/>    로그인 세션이 유효하면 home으로 연결, 유효하지 않으면 login으로 연결 */}
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
            userInfo.logined &&
            <div className="homeBody">
              <header className="header">
                <div className="headerBtnBox">
                  <div className="leftBtnBox">
                    <button className="noticeBtn mouseover">!</button>
                    <Link to="/home">
                      <button className="homeBtn mouseover">홈</button>
                    </Link>
                    {boardNames.map((boardName, index) => (
                      <Link key={index + 1} to={`/board/${index + 1}`}>
                        <button className="boardBtn mouseover">{boardName}</button>
                      </Link>
                    ))}
                  </div>
                  <div className="rightBtnBox">
                    <MyInfoModal data={userInfo} setData={setUserInfo}/>
                    <button className="inventoryBtn mouseover">
                      <img src={inventoryIco} alt="" />
                    </button>
                    <button className="storeBtn mouseover">
                      <img src={storeIco} alt="" />
                    </button>
                  </div>
                </div>
                <div className="headerProfileBox">
                  {/* 로그아웃 임시 버튼 만들었어요. */}
                  <button className="logoutBtntest" onClick={handleLogout}>로그아웃</button>
                  {/* hamster에 현재 로그인한 계정의 아이콘 받아오기 */}
                  <IconSetModal img={<img className="userIcon" src={userInfo.icon} alt="" />}
                    content={
                      <div className="iconModal">
                        <div className="iconModalLeftBox">
                          <img src={userInfo.icon} alt=""/>
                          <p>{userInfo.nickname}</p>
                        </div>
                        <div className="iconModalRightBox">
                          <div className="iconModalTitle">
                            <p>아이콘 설정</p>
                          </div>
                          <div className="iconSelectArea">
                            {
                              userInfo.icons.map(function(a, i){
                                return (
                                  <div className="iconsBox">
                                    {/* 눌렀을 때 icon=icons[i]로 바꾸기 */}
                                    <img src={userInfo.icons[i]}/>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                    }/>
                  <div className="nameBox">
                    <p className="nickname">{userInfo.nickname}</p>
                    <p className="profileMessage">"{userInfo.profileMessage}"</p>
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
