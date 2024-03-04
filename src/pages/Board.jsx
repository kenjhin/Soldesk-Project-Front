/* eslint-disable */
import React, { useState, useEffect  } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import PostDetail from './PostDetail';

const Board = () => {
  const [defaultData, setDefaultData] = useState([{
    boardId: 1,
    postNum: 1,
    postTitle: ["111111111111"],
    postContent: "sdaasd",
    postWriter: "김기모띵",
    postDate: "2024.02.21",
    postViews: 0,
    postLike: 0,
  },{
    boardId: 2,
    postNum: 2,
    postTitle: ["222222222"],
    postContent: "sdaasd",
    postWriter: "김기모띵",
    postDate: "2024.02.21",
    postViews: 0,
    postLike: 0,
  }]);
  const location = useLocation();
  const boardId = location.state?.boardId; // 추가된 부분
  const boardNames =(['자유게시판', '인기게시판', '이슈게시판', '기념게시판', '신고게시판']);
  const [data, setData] = useState(defaultData);
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지: 1번 페이지
  const [postsPerPage] = useState(20);                // 페이지 당 포스트 수 : 20개
  
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
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지에서 보여줄 20개(postsPerPage)의 포스트
  const filteredPosts = currentPosts.filter(item => item.boardId === boardId);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingRight: "50px",
        paddingLeft: "50px",
        overflow: "scroll",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <h2 style={{ color: "white", marginTop: "20px", marginBottom: "20px", fontSize: "32px",
                      fontWeight: 'bold' }} >
          {boardNames[boardId-1]}
        </h2>
        <table className="boardTable">
          <thead>
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
          <tbody style={{ minHeight: "auto" }}>
            {filteredPosts.map((item) => (
              <tr key={item.id}>
                <td className="td_id">{item.postNum}</td>
                <td className="td_title">
                  <Link
                    to={{
                      pathname: `/board/${item.boardId}/${item.postNum}`,
                      state: { item },
                    }}
                  >
                    {item.postTitle[0]}
                  </Link>
                </td>
                <td className="td_writer">{item.postWriter}</td>
                <td className="td_date">{item.postDate}</td>
                <td className="td_views">{item.postViews}</td>
                <td className="td_like">{item.postLike}</td>
              </tr>
            ))}
            {/* 글쓰기 */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={{marginTop: '10px', border: 'white solid 1px', background: 'none', color: 'white'}}
                      onClick={() => {}}>글쓰기</button>
            </div>
            {/* 페이지 버튼 */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ul style={{ color: "white" }}>
                {Array.from(
                  { length: Math.ceil(data.length / postsPerPage) },
                  (_, index) => (
                    <li key={index + 1}>
                      <button
                        onClick={() => paginate(index + 1)}
                        style={{
                          marginTop: "20px",
                          border: "white solid 1px",
                          background: "none",
                          color: "white",
                        }}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Board;