/* eslint-disable */
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
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
// fonts
import nbg from "./assets/font/NanumBarunGothic.ttf";
import nbgB from "./assets/font/NanumBarunGothicBold.ttf";
import nbgL from "./assets/font/NanumBarunGothicLight.ttf";
import nbgUL from "./assets/font/NanumBarunGothicUltraLight.ttf";
// pages
import Login from "./pages/Login";
import Main from "./pages/Main";
import Board from './pages/Board';
// components
import IconSetModal from './components/modals/IconSetModal';
import MyInfoModal from './components/modals/MyInfoModal';

function App() {

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
      zonecode: '12345',
      roadAddress: '인천광역시 서구 석남로 62번길 5',
      detailAddress: '거평하이츠 라동 302호'
    }
  });
  const boardNames = ['자유게시판', '인기게시판', '이슈게시판', '기념게시판', '신고게시판'];

  const handleInputChange = (e, key) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [key]: e.target.value
    }));
  };

  const handleDetailAddressChange = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      address: {
        ...prevUserInfo.address,
        detailAddress: e.target.value
      }
    }));
  };

  const handleConfirmClick = () => {
    // 미입력 시 경고 메시지 추가
    if (!userInfo.id || !userInfo.pw || !userInfo.pwCheck || !userInfo.nickname || !userInfo.address.zonecode || 
        !userInfo.address.roadAddress || !userInfo.address.detailAddress) {
      alert('모든 항목을 입력해주세요.');
      
      return;
    }
    
    // 비밀번호 일치 여부 확인
    if (userInfo.pw !== userInfo.pwCheck) {
      alert('비밀번호가 일치하지 않습니다.');

      return;
    }
  };

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
                    <MyInfoModal content={
                      <div className="myInfoBox">
                        <h1>MY INFO</h1>
                        <div className="myInfo-1">
                          <input value={userInfo.id} style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} readOnly/>
                          <input value={userInfo.pw} type="password" placeholder="비밀번호"
                            onChange={(e) => handleInputChange(e, 'pw')}/>
                          <input value={userInfo.pwCheck} type="password" placeholder="비밀번호 확인" 
                            onChange={(e) => handleInputChange(e, 'pwCheck')}
                            style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}/>
                            {userInfo.pw!==userInfo.pwCheck && 
                              <p style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</p>}
                        </div>
                        <div className="myInfo-2">
                          <input value={userInfo.nickname} style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}/>
                          <input value={JSON.stringify(userInfo.address.zonecode).replace(/"/g,'')} />
                          <input value={JSON.stringify(userInfo.address.roadAddress).replace(/"/g,'')} />
                          <input value={JSON.stringify(userInfo.address.detailAddress).replace(/"/g,'')} 
                            style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}
                            onChange={handleDetailAddressChange}/>
                        </div>
                        <button onClick={handleConfirmClick}>확인</button>
                      </div>
                    }
                    />
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
