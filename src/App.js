/* eslint-disable */ 
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [제목, 제목변경] = useState(['기무링', '기무링딩동']);
  let [따봉, 따봉변경] = useState(0);
  return (
    <div>
      <div className='screen1'>
        <button className='homeBtn'>홈</button>
      </div>
      <div className='screen2'>

      </div>
    </div>
  );
}

export default App;
