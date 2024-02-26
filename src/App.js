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
import Board from './pages/Board'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <div className="homeBody">
              <header className="header">
                <div className="headerBtnBox">
                  <div className="leftBtnBox">
                    <button className="noticeBtn">!</button>
                    <button className="homeBtn">홈</button>
                    <button className="boardBtn">자유게시판</button>
                    <button className="boardBtn">인기게시판</button>
                    <button className="boardBtn">이슈게시판</button>
                    <button className="boardBtn">기념게시판</button>
                    <button className="boardBtn">기모띵게시판</button>
                  </div>
                  <div className="rightBtnBox">
                    <img className="myInfoBtn" src={myInfoIco} alt="" />
                    <img className="inventoryBtn" src={inventoryIco} alt="" />
                    <img className="storeBtn" src={storeIco} alt="" />
                  </div>
                </div>
                <div className="headerProfileBox">
                  <img className="userIcon" src={hamster} alt="" />
                </div>
              </header>

              <main className="main">
                <div className="messenger">
                  <button className="messengerText">커뮤니티</button>
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
        {/* <Route paht="/"/>    로그인 세션이 유효하면 home으로 연결, 유효하지 않으면 login으로 연결 */}
        <Route path="/" 
          element={
            <>
              <Login/>
            </>
          }
        />
         <Route path="/board" element={<Board />} />
      </Routes>
    </>
  );
}

export default App;
