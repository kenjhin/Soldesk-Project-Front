/* eslint-disable */
import React, { useState, useEffect } from 'react';

const Board = ({ boardName }) => {
  const [defaultData, setDefaultData] = useState({
    postNum: 0,
    postTitle: ["오늘은 밥을 먹었다. 기무띵했다."],
    postWriter: "김기모띵",
    postDate: "2024.02.21",
    postViews: 0,
    postLike: 0,
  });
  const [data, setData] = useState([defaultData]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/board');
      const result = await response.json();
      console.log('Fetched Data:', result);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 페이지 변경
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingRight: "50px",
        paddingLeft: "50px",
        overflow: "scroll",
      }}
    >
      <div>
        <table className="boardTable">
          <thead>
            <h2 style={{ color: "white", marginTop: "20px" }}>{boardName}</h2>
            <tr>
              <th className="th_id">번호</th>
              <th className="th_title">제목</th>
              <th className="th_writer">작성자</th>
              <th className="th_date">작성일</th>
              <th className="th_views">조회수</th>
              <th className="th_like">추천</th>
            </tr>
          </thead>
        </table>
        <table className="boardTable">
          <tbody  style={{minHeight: 'auto'}}>
            {currentPosts.map((item) => (
              <tr key={item.id}>
                <td className="td_id">{item.postNum}</td>
                <td className="td_title">{item.postTitle[0]}</td>
                <td className="td_writer">{item.postWriter}</td>
                <td className="td_date">{item.postDate}</td>
                <td className="td_views">{item.postViews}</td>
                <td className="td_like">{item.postLike}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {/* 페이지 버튼 */}
          <ul style={{ color: "white" }}>
            {Array.from(
              { length: Math.ceil(data.length / postsPerPage) },
              (_, index) => (
                <li key={index + 1}>
                  <button onClick={() => paginate(index + 1)} 
                          style={{marginTop: '20px', border: 'white solid 1px', background: 'none', color: 'white'}}>
                      {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Board;