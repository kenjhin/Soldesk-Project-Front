/* eslint-disable */
import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "../styles/Main.css";
import logo from "../assets/img/login/login_banner.png"
import Board from './Board';

const Main = () => {

  const location = useLocation();
  const boardId = location.state?.boardId;

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
              <div className="hotPostBox" style={{ color: "white" }}>
                이슈글 자리
              </div>
            </div>
          }
        />
        <Route path={`board/${boardId}/*`} element={<Board/>}/>
      </Routes>
    </div>
  );
}

export default Main