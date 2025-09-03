import React from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate("/connected");
  };

  return (
    <div className="login-container">
      <div className="logo">
        <h1>SORA</h1>
        <p>임시로 글자만 넣어둠, 이미지로 대체예정</p>
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
