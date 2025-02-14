import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillHome, AiOutlineEdit, AiFillQuestionCircle, AiOutlineQq} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AccountModal from "../account/AccountModal";
import { USER_ID } from "../assets/Constant";

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
  const [myId,setMyId] = useState(USER_ID);

  useEffect(() => {
      const storedId = localStorage.getItem("id");
      if (storedId) {
        setMyId(Number(storedId));
      }
    }, []);

  const handleCreatePost = () => {
    if(myId === -1){
      alert("로그인을 해주세요.");
      return;
    }
    else{
      navigate("/post-create");
    }
  }

  return (
    <>
      <BottomNavContainer>
        <NavItem onClick={() => navigate("/")}> 
          <AiFillHome size={20} />
          홈
        </NavItem>
        <NavItem onClick={handleCreatePost}>
          <AiOutlineEdit size={20} />
          글쓰기
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
