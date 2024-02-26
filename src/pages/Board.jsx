// pages/Board.jsx
import React, { useState, useEffect } from 'react';

const Board = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Board 컴포넌트가 마운트될 때 데이터를 가져오는 API 호출
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/board');
      const result = await response.json();
      console.log('Fetched Data:', result); // 콘솔 로그 추가
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
    <h2 style={{ color: 'white' }}>Board</h2>
    <ul style={{ color: 'white' }}>
      {data.map(item => (
        <li key={item.id}>
          {Object.entries(item).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Board;