//import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
//import { fetchDeleteProfile } from "./ProfileService";
//import ProfileModal from "./ProfileMenu/ProfileModal";
import { fetchCreateFriend, fetchDeleteFriend } from "./FriendService";
import { useEffect, useState } from "react";
import { USER_ID } from "../assets/Constant";
import { CreateFriendReq } from "../Data/friend_model";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3vh;
  width: 20%;
  align-items: flex-start;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.6vh;
  font-size: 2vh;
  background-color: rgba(0,0,0,0.05);
  border: 1px solid #ffff;
  border-radius: 5px;
  width: 40vh;
  height: 4.5vh;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0.2);
  }
`;

interface FriendMenuProps {
  userId: number;
}

const FriendMenu: React.FC<FriendMenuProps> = ({ userId }) => {
  const navigate = useNavigate();
  const [myId, setMyId] = useState<number>(USER_ID);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setMyId(Number(storedId));
    }
  }, []);

  const FriendParam:CreateFriendReq = {
    user_id: myId,
    friend_id: userId,
  }
  
  const handleCreateFriend = async () => {
    if (window.confirm("친구 추가하시겠습니까?")) {
      const success = await fetchCreateFriend(FriendParam);
      if (success) {
        alert("친구 추가를 성공했습니다.");
        window.location.reload();
      }
    }
  };

  const handleDeleteFriend = async () => {
    if (window.confirm("친구를 삭제 하시겠습니까?")) {
      const success = await fetchDeleteFriend(FriendParam, myId);
      if (success) {
        alert("친구 삭제를 성공했습니다.");
        window.location.reload();
      }
    }
  }

  return (
    <MenuContainer>
      <MenuButton onClick={handleCreateFriend}>친구 등록</MenuButton>
      <MenuButton onClick={handleDeleteFriend}>친구 삭제</MenuButton>
    </MenuContainer>
  );
};


export default FriendMenu;