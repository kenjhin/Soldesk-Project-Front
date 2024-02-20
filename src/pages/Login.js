import loginBanner from "../assets/img/login_banner.png";

function Login(){
    return (
      <div className="loginBody">
        <div className="loginArea">
          <div className="loginLogo">로그인</div>
          <div className="loginInputArea"> 
            <label for="idInput" className="idPlaceholder">계정이름</label>
              <input id="idInput" className="loginInput"/>     
            <input className="loginInput" placeholder="비밀번호" type="password"/>
            <div className="idCheckboxContainer">
              <label className="idCheckLabel"><input className="idCheckbox" type="checkbox"/>로그인 상태 유지</label>
            </div>
          </div>
        </div>
        <div className="loginBannerContainer">
          <img className="loginBanner" src={loginBanner} alt="잉 기무링"/>
        </div>
      </div>
    )
}

export default Login