/* eslint-disable */
import React, { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import "../styles/Main.css";
import logo from "../assets/img/login/login_banner.png"
import Board from './Board';

const Main = () => {

  const boardNames = ['자유게시판', '인기게시판', '이슈게시판', '기념게시판', '신고게시판']

  return (
    <div className="mainBody">
      <Routes>
        <Route
          path="/home"
          element={
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div className="slideBox">
                <img src={logo} alt="" />
              </div>
              <div className="hotPostBox" style={{color: 'white'}}>이슈글 자리</div>
            </div>
          }
        />
        {boardNames.map((boardName, i) => (
          <Route
            key={i + 1}
            path={`/board/${i + 1}`}
            element={<Board boardName={boardName} />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default Main