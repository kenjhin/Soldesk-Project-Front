/* eslint-disable */ 
import React, { useState } from 'react';
import './styles/App.css';
import storeIco from './assets/img/store_ico.png'
import myInfoIco from './assets/img/myInfo_ico.png'
import inventoryIco from './assets/img/inventory_ico.png'
import hamster from './assets/img/hamster.jpg'
import nbg from './assets/font/NanumBarunGothic.ttf'
import nbgB from './assets/font/NanumBarunGothicBold.ttf'
import nbgL from './assets/font/NanumBarunGothicLight.ttf'
import nbgUL from './assets/font/NanumBarunGothicUltraLight.ttf'
function App() {

  return (
    <>
      <header className='header'>
        <div className='headerBtnBox'>
          <div className='headerBox1'>
            <button className='noticeBtn'>!</button>
            <button className='homeBtn'>홈</button>
            <img className='myInfoBtn' src={myInfoIco} alt=''/>
            <img className='inventoryBtn' src={inventoryIco} alt=''/>
            <img className='storeBtn' src={storeIco} alt=''/>
          </div>
          <div className='headerBox2'>
            <img className='userIcon' src={hamster} alt=''/>
          </div>
        </div>
      </header>
          
      <div className='messenger'>
        <button className='messengerText'>커뮤니티</button>
        <button className='messengerBtn'>ㅇ</button>
        <button className='messengerBtn'>ㅇ</button>
        <button className='messengerBtn'>ㅇ</button>
        <button className='messengerBtn'>ㅇ</button>
      </div>

      <main></main>
      <footer></footer>
    </>
  );
}

export default App;
