import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchDeleteProfile } from "./ProfileService";
import ProfileModal from "./ProfileMenu/ProfileModal";
import FriendModal from "../friend/FriendModal";
import { Profile } from "../Data/profile_model";
import { fetchGetFriends } from "../friend/FriendService";
import { USER_ID } from "../assets/Constant";

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

interface ProfileMenuProps {
  userId: number;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userId }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const [myId, setMyId] = useState<number>(USER_ID);
  
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setMyId(Number(storedId));
    }
  }, []);

  const handleCreateProfile = () => {
    navigate(`/profileCreate?userId=${userId}`);
  };

  const handleEditProfile = () => {
    navigate(`/profileEdit?userId=${userId}`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const success = await fetchDeleteProfile(userId);
      if (success) {
        alert("삭제를 성공했습니다.");
        window.location.reload();
      }
    }
  };

  const handleGetFriends = () => {
    setIsFriendModalOpen(true);
    
  };

  return (
    <>
      <MenuContainer>
        <MenuButton onClick={handleCreateProfile}>프로필 생성</MenuButton>
        <MenuButton onClick={handleEditProfile}>프로필 편집</MenuButton>
        <MenuButton onClick={handleDelete}>프로필 삭제</MenuButton>
        <MenuButton onClick={() => setIsModalOpen(true)}>프로필 보기</MenuButton>
        <MenuButton onClick={handleGetFriends}>친구 보기</MenuButton>
        {isModalOpen && <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        {isFriendModalOpen && (
          <FriendModal isOpen={isFriendModalOpen} onClose={() => setIsFriendModalOpen(false)} />
        )}
      </MenuContainer>
    </>
  );
};

export default ProfileMenu;
