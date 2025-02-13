import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillQuestionCircle } from "react-icons/ai";
import { fetchGetProfilePic } from "./ProfileService";

interface ProfileImageProps {
  userId: number;
}

const ImageWrapper = styled.div<{ hasImage: boolean }>`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ hasImage }) => (hasImage ? "transparent" : "#e5e7eb")};
  color: #6b7280;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImage: React.FC<ProfileImageProps> = ({ userId }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const imageUrl = await fetchGetProfilePic(userId);
        if (imageUrl) {
          setImage(imageUrl);
          console.log(imageUrl);
        }
      } catch (error) {
        console.error("Failed to load profile image:", error);
      }
    };

    loadProfileImage();
  }, [userId]);

  return (
    <ImageWrapper hasImage={!!image}>
      {image ? <StyledImage src={image} alt="Profile" /> : <AiFillQuestionCircle size={64} />}
    </ImageWrapper>
  );
};

export default ProfileImage;
