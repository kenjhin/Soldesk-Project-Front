import React, {useState} from 'react'

const Board = () => {
  const [post, setPost] = useState({
    postNum: 0,
    postTitle: ["오늘은 밥을 먹었다. 기무띵했다."],
    postWriter: "김기모띵",
    postDate: "2024.02.21",
    postViews: 0,
    postLike: 0,
  });

  const handleTitleChange = () => {
    // post 객체를 복사하고 특정 속성만 업데이트
    setPost({
      ...post,
      postTitle: ["새로운 제목"],
    });
  };

  return (
    <div>
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
        <tbody>
          <tr>
            <td className="td_id">{post.postNum}</td>
            <td className="td_title">{post.postTitle[0]}</td>
            <td className="td_writer">{post.postWriter}</td>
            <td className="td_date">{post.postDate}</td>
            <td className="td_views">{post.postViews}</td>
            <td className="td_like">{post.postLike}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Board