/* eslint-disable */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios import 추가
import "../styles/Login.css";
import loginBanner from "../assets/img/login/login_banner.png";
import arrow from "../assets/img/login/arrow_right.png"
import riot_logo from "../assets/img/login/riot_logo.png"
import TextInput from "../components/TextInput.jsx"
import SignUpModal from "../components//modals/SignUpModal.jsx"



function Login(){
  const [modalShow, setModalShow] = useState(false);
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();

  function handleTextInputValueChange(value){
    setUsername(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

// 로그인핸들러 함수
  function handleLoginClick(){
    axios.post('http://localhost:3001/login', { username, password })
      .then(response => {
        if (response.data.success) {
          // 서버에서 전달받은 리다이렉트 경로로 이동
          navigate(response.data.redirectPath);

          // 세션 정보를 저장
          sessionStorage.setItem('isLoggedIn', true);
          sessionStorage.setItem('username', response.data.userInfo.username);
          console.log('isLoggedIn:', sessionStorage.getItem('isLoggedIn'));
          console.log('username:', sessionStorage.getItem('username'));
        }
      })
      .catch(error => {
        // 오류 처리
      });
  }
 
  return (
    <div className="loginBody">
      <div className="loginArea">
        <img className="loginLogo" src={riot_logo} alt=""/>
        <div className="loginLoginText">로그인</div>
        <div className="loginInputArea"> 
          <TextInput label="계정이름" onInputChange={handleTextInputValueChange}></TextInput>
          <TextInput id="textInputPw" label="비밀번호" type="password" onInputChange={handlePasswordChange}></TextInput>
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