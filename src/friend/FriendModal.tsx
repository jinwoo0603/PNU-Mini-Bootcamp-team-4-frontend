import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Profile } from "../Data/profile_model";
import { USER_ID } from "../assets/Constant";
import { fetchGetFriends } from "./FriendService";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2vh;
  border-radius: 8px;
  width: 30%;
  max-height: 50vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 2vh;
  padding: 1vh 2vh;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #cc0000;
  }
`;

const FriendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const FriendItem = styled.li`
  background: rgba(0, 0, 0, 0.05);
  padding: 1vh;
  margin: 0.5vh 0;
  border-radius: 5px;
`;

const NoFriendsMessage = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 2vh;
`;

interface FriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FriendModal: React.FC<FriendModalProps> = ({ isOpen, onClose }) => {
  const [myId, setMyId] = useState<number>(USER_ID);
  const [friends, setFriends] = useState<Profile[]>([]);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setMyId(Number(storedId));
      handleFriends(storedId);
    }
  }, []);

  const handleFriends = async(id:number) => {
    try {
      const data = await fetchGetFriends(id);
      setFriends(data);
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  }
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>친구 목록</h2>
        <FriendList>
          {friends.length > 0 ? (
            friends.map((friend) => (
              <FriendItem key={friend.user_id}>{friend.username} [ID: {friend.user_id}]</FriendItem>
            ))
          ) : (
            <NoFriendsMessage>친구가 없습니다...</NoFriendsMessage>
          )}
        </FriendList>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FriendModal;
