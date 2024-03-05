/* eslint-disable */
import React, { useState, useEffect } from "react";
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
  // DB로부터 값을 받아서 넣을 곳(icons는 mysql에서 TEXT타입으로 하면 문자열배열로 나타낼수있음)
  const [userData, setUserData] = useState({
    logined: true,
    icon: hamster,
    icons: [hamster, hamster],
    nickname: '유저닉네임',
    profileMessage: '상태메시지',
    status: 'online',
    username: 'ID',
    password: 'password',
    confirmPassword: 'password',
    address: 'zonecode!!fullAddress!!detailAddress',
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
            userData.logined &&
            <div className="homeBody">
              <header className="header">
                <div className="headerBtnBox">
                  <div className="leftBtnBox">
                    <button className="noticeBtn mouseover">!</button>
                    <Link to="/home">
                      <button className="homeBtn mouseover">홈</button>
                    </Link>
                    {boardNames.map((boardName, index) => (
                      <Link key={index + 1} to={`/board/${index + 1}`} state={{boardId: index+1}}>
                        <button className="boardBtn mouseover">{boardName}</button>
                      </Link>
                    ))}
                  </div>
                  <div className="rightBtnBox">
                    <MyInfoModal data={userData} setData={setUserData}/>
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
                  <IconSetModal img={<img className="userIcon" src={userData.icon} alt="" />}
                    content={
                      <div className="iconModal">
                        <div className="iconModalLeftBox">
                          <img src={userData.icon} alt=""/>
                          <p>{userData.nickname}</p>
                        </div>
                        <div className="iconModalRightBox">
                          <div className="iconModalTitle">
                            <p>아이콘 설정</p>
                          </div>
                          <div className="iconSelectArea">
                            {
                              userData.icons.map(function(a, i){
                                return (
                                  <div key={i} className="iconsBox">
                                    {/* 눌렀을 때 icon=icons[i]로 바꾸기 */}
                                    <img src={userData.icons[i]}/>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                  }/>
                  <div className="nameBox">
                    <p className="nickname">{userData.nickname}</p>
                    <p className="profileMessage">"{userData.profileMessage}"</p>
                  </div>
                  <button className="logoutBtn" onClick={handleLogout}>logout</button>
                </div>
              </header>
              <main className="main">
                <div className="messenger">
                  <div className="messengerBtnBox">
                    <p className="messengerText">커뮤니티</p>
                    <button className="messengerBtn"><img src={search}/></button>
                    <button className="messengerBtn"><img src={sort}/></button>
                    <button className="messengerBtn"><img src={addFolder}/></button>
                    <button className="messengerBtn"><img src={addPerson}/></button>
                  </div>
                  <div className="messengerGroupArea">

                  </div>
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
