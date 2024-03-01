/* eslint-disable */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login.css";
import loginBanner from "../assets/img/login/login_banner.png";
import arrow from "../assets/img/login/arrow_right.png"
import riot_logo from "../assets/img/login/riot_logo.png"
import TextInput from "../components/TextInput.jsx"
import SignUpModal from "../components//modals/SignUpModal.jsx"

function Login() {
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleTextInputValueChange(value) {
    setUsername(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  function handleLoginClick() {
    // 간단한 클라이언트 측 유효성 검사
    if (!username || !password) {
      alert('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    axios.post('http://localhost:3001/login', { username, password })
      .then(response => {
        if (response.data.success) {
          // 로그인 성공
          sessionStorage.setItem('isLoggedIn', true);
          sessionStorage.setItem('username', response.data.userInfo.username);

          console.log('로그인 유저 정보:', {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            username: sessionStorage.getItem('username')
          });
          // 여기서 서버에서 전달한 redirectPath로 리다이렉트
          navigate(response.data.redirectPath);
        } else {
          // 로그인 실패
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error('로그인 오류:', error);
      });
  }

  return (
    <div className="loginBody">
      <div className="loginArea">
        <img className="loginLogo" src={riot_logo} alt=""/>
        <div className="loginLoginText">로그인</div>
        <div className="loginInputArea"> 
          <TextInput label="계정이름" value={username} onInputChange={handleTextInputValueChange}></TextInput>
          <TextInput id="textInputPw" label="비밀번호" type="password" value={password} onInputChange={handlePasswordChange}></TextInput>
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