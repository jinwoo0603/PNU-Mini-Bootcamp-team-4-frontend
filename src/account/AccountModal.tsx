import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  position: relative;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #3498db;
  color: white;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const AccountModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log("id:" + localStorage.getItem("id"));
  }, []);

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    onClose();
    alert("로그아웃 되었습니다.");
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <h2>{isLoggedIn ? "로그아웃" : "로그인 / 회원가입"}</h2>
        {isLoggedIn ? (
          <Button onClick={handleLogout}>로그아웃</Button>
        ) : (
          <>
            <Button onClick={handleLogin}>로그인</Button>
            <Button onClick={handleRegister}>회원가입</Button>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AccountModal;
