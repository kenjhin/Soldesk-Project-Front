/* eslint-disable */
import React, { useState } from "react";
import "../styles/Login.css";
import loginBanner from "../assets/img/login/login_banner.png";
import arrow from "../assets/img/login/arrow_right.png"
import riot_logo from "../assets/img/login/riot_logo.png"
import TextInput from "../components/TextInput.jsx"
import SignUpModal from "../components//modals/SignUpModal.jsx"

function Login(){
  const [modalShow, setModalShow] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  function handleTextInputValueChange(value){
    setTextInputValue(value);
  }

  function handleLoginClick(){
    // 모든 TextInput 값이 존재할 때 로그인버튼 활성화.
  }
 
  return (
    <div className="loginBody">
      <div className="loginArea">
        <img className="loginLogo" src={riot_logo} alt=""/>
        <div className="loginLoginText">로그인</div>
        <div className="loginInputArea"> 
          <TextInput label="계정이름" onInputChange={handleTextInputValueChange}></TextInput>
          <TextInput id="textInputPw" label="비밀번호" type="password"></TextInput>
          <div className="idCheckboxContainer">
            <label className="idCheckLabel"><input className="idCheckbox" type="checkbox"/>로그인 상태 유지</label>
          </div>
        </div>
          <button className="loginBtnContainer" onClick={handleLoginClick}><img className="loginBtn" src={arrow} alt=""/></button>
          <button className="singUpBtn" onClick={() => setModalShow(true)}>계정 생성</button>
          <SignUpModal show={modalShow} onHide={() => setModalShow(false)}/>
      </div>
      <div className="loginBannerContainer">
        <img className="loginBanner" src={loginBanner} alt="잉 기무링"/>
      </div>
    </div>
  )
}

export default Login;