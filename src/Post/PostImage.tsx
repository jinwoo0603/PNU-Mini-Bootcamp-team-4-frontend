import React, { useEffect, useState } from "react";
import { fetchGetPostFile } from "./PostService";
import styled from "styled-components";

type PostImageProps = {
  postId: number;
  altText?: string;
  className?: string;
};

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 20px;
  margin-bottom: 5vh;
`;

const PostImage: React.FC<PostImageProps> = ({ postId }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const file = await fetchGetPostFile(postId);
        if (file) {
          setImageUrl(file);
        } else {
          setError("No image found");
        }
      } catch (err) {
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [postId]);

  if (loading) return <p>Loading image...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ImageContainer>
      {imageUrl ? <img src={imageUrl} alt="이미지 없음" style={{ maxWidth: "60vh", height: "60vh" }} /> : <p>이미지가 없음</p>}
    </ImageContainer>
  );
};

export default PostImage;
