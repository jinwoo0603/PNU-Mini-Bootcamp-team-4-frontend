import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 45vh;
  text-align: center;
`;

const Input = styled.input`
  width: 40vh;
  padding: 1.3vh;
  margin-top: 1vh;
  margin-bottom: 1.5vh;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 45vh;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (userId.trim()) {
      navigate(`/profileView?userId=${userId}`);
      onClose();
    } else {
      alert("사용자 ID를 입력하세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>프로필 보기</h2>
        <Input
          type="number"
          placeholder="User ID 입력"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Button onClick={handleViewProfile}>확인</Button>
        <Button onClick={onClose} style={{ backgroundColor: "#ccc", color: "black" }}>취소</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileModal;