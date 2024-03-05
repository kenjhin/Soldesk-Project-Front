/* eslint-disable */
import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import "../styles/Main.css";
import logo from "../assets/img/login/login_banner.png"
import Board from './Board';
import PostDetail from './PostDetail';
import Post from './Post';

const Main = () => {

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
        <Route path={`/board/:boardId/*`} element={<Board/>}/>
        <Route path={`/board/:boardId/:postId`} element={<PostDetail/>}/>
        <Route path={`/board/:boardId/post`} element={<Post/>}/> 
      </Routes>
    </div>
  );
}

export default Main