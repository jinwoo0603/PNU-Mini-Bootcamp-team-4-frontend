import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import TopHeader from "../home/TopHeader";
import ProfileMenu from "./ProfileMenu";
import { fetchGetProfile } from "./ProfileService";
import { USER_ID } from "../assets/Constant";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 9vh;
  position: relative;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5vh;
  margin-right: 12vh;
  position: relative;
`;

const UserName = styled.h2`
  font-size: 3.5vh;
  font-weight: normal;
  margin-top: 1vh;
`;

// 말풍선 스타일
const Bubble = styled.div`
  position: absolute;
  top: -3vh;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  padding: 1vh 2vh;
  border-radius: 20px;
  font-size: 2vh;
  font-weight: bold;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
`;


const HorizontalDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ccc;
  margin-top: 4vh;
`;

const ProfileHome = () => {
  const [username, setUsername] = useState<string>("부산대학교");
  const [bio,setBio] = useState<string>("정보컴퓨터공학");

  const [myId,setMyId] = useState<number>(0);
    
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setMyId(Number(storedId));
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchGetProfile(myId);
      setUsername(res.username);
      setBio(res.bio);
    };
    fetch();
  }, [myId]);

  return (
    <ProfileContainer>
      <TopHeader />
      <HorizontalDivider />
      <ProfileContent>
        <ProfileInfo>
          <Bubble>{bio}</Bubble>
          <ProfileImage userId={myId} />
          <UserName>{username}</UserName>
        </ProfileInfo>
        <ProfileMenu userId={myId}/>
      </ProfileContent>
      <HorizontalDivider />
    </ProfileContainer>
  );
};

export default ProfileHome;
