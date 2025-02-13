import React, { useState } from "react";
import styled from "styled-components";
import { AiFillHome, AiOutlineSearch, AiOutlineEdit, AiFillQuestionCircle, AiOutlineQq} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AccountModal from "../account/AccountModal";

const BottomNavContainer = styled.nav`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 83vh;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const BottomNav = () => {
  const navigate = useNavigate(); // 네비게이션 함수
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BottomNavContainer>
        <NavItem onClick={() => navigate("/")}> 
          <AiFillHome size={20} />
          홈
        </NavItem>
        <NavItem onClick={() => navigate("/post-create")}>
          <AiOutlineEdit size={20} />
          글쓰기
        </NavItem>
        <NavItem onClick={() => navigate("/search")}>
          <AiOutlineSearch size={20} />
          검색
        </NavItem>
        <NavItem onClick={() => navigate("/profile")}>
          <AiFillQuestionCircle size={20} />
          프로필
        </NavItem>
        <NavItem onClick={() => setIsModalOpen(true)}>
          <AiOutlineQq size={20} />
          계정
        </NavItem>
      </BottomNavContainer>
      {isModalOpen && <AccountModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default BottomNav;
