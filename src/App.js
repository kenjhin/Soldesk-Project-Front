/* eslint-disable */ 
import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import Login from './Login';

function App() {
  let [제목, 제목변경] = useState(['기무링', '기무링딩동']);
  let [따봉, 따봉변경] = useState(0);
  let navigate = useNavigate();


  return (
    <div>

      <Routes>
        <Route path='/' element={
            <>
            <div className='screen1'>
              <button className='homeBtn' onClick={()=>{navigate('/')}}>홈</button>
              <button className='homeBtn' onClick={()=>{navigate('/Login')}} >로그인</button>
              </div>
          <div className='screen2'>
              
            </div>
            </>

        }/>
        <Route path='/Login' element={<Login/>}/>
        </Routes>

    </div>
  );
}

export default App;
