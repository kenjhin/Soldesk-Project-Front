import loginBanner from "../assets/img/login_banner.png";
import React, { useState } from "react";
import TextInput from "../components/TextInput.js"
import arrow from "../assets/img/login/arrow_right.png"
import riot_logo from "../assets/img/login/riot_logo.png"

function Login(){

  return (
    <div className="loginBody">
      <div className="loginArea">
        <img className="loginLogo" src={riot_logo} alt=""/>
        <div className="loginLoginText">로그인</div>
        <div className="loginInputArea"> 
          <TextInput label="계정이름"></TextInput>
          <TextInput label="비밀번호" type="password"></TextInput>
          <div className="idCheckboxContainer">
            <label className="idCheckLabel"><input className="idCheckbox" type="checkbox"/>로그인 상태 유지</label>
          </div>
        </div>
        <button className="loginBtnContainer">
          <img className="loginBtn" src={arrow} alt=""/></button>
          <button className="singUpBtn">계정 생성</button>
      </div>
      <div className="loginBannerContainer">
        <img className="loginBanner" src={loginBanner} alt="잉 기무링"/>
      </div>
    </div>
  )
}

export default Login