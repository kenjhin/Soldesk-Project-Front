/* eslint-disable */
import React, { useState } from 'react'
import "../styles/Main.css";

const Main = () => {
  let [postNum, setPostNum] = useState(0); // board테이블 id
  let [postTitle, setPostTitle] = useState(['오늘은 밥을 먹었다. 기무띵했다.']); // board테이블 title
  let [postWriter, setPostWriter] = useState('김기모띵'); // board테이블 writer의 별명
  let [postDate, setPostDate] = useState('2024.02.21'); // board테이블 date
  let [postViews, setPostViews] = useState(0); // board테이블 views
  let [postLike, setPostLike] = useState(0); // board테이블 like

  return (
    <div className='mainBody'>
      <table className='boardTable'>
        <thead>
          <tr>
            <th className='th_id'>번호</th>
            <th className='th_title'>제목</th>
            <th className='th_writer'>작성자</th>
            <th className='th_date'>작성일</th>
            <th className='th_views'>조회수</th>
            <th className='th_like'>추천</th>
          </tr>
        </thead>
      </table>
      <table className='boardTable'>
        <tbody>
          <tr>
            <td className='td_id'>{postNum}</td>
            <td className='td_title'>{postTitle[0]}</td>
            <td className='td_writer'>{postWriter}</td>
            <td className='td_date'>{postDate}</td>
            <td className='td_views'>{postViews}</td>
            <td className='td_like'>{postLike}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Main