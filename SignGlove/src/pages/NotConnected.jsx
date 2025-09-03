import React from 'react';
import '../styles/NotConnected.css';

function NotConnected() {
  return (
    <div className="not-connected-container">
      <h2>장갑이 연결되지 않았습니다.</h2>
      <p>장갑을 연결한 후 다시 로그인해 주세요.</p>
    </div>
  );
}

export default NotConnected;
