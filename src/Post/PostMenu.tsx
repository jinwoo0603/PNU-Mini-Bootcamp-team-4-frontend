import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostEditModal from "./PostEditModal";
import { Post, UpdatePostReq } from "../Data/post_model";
import { USER_ID } from "../assets/Constant";

const MenuContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  &:hover {
    background: #f0f0f0;
  }
`;

interface PostMenuProps {
  post: Post;
  onClose: () => void;
  onDelete: () => void;
  onEdit: (updatedPost: UpdatePostReq) => void;
}

const PostMenu: React.FC<PostMenuProps> = ({ post, onClose, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [myId,setMyId] = useState<number>(USER_ID);
  
    useEffect(() => {
        const storedId = localStorage.getItem("id");
        if (storedId) {
          setMyId(Number(storedId));
        }
    }, []);

  const handleSave = (updatedTitle: string, updatedBody: string) => {
    const updatedPost: UpdatePostReq = {
      title: updatedTitle,
      body: updatedBody,
      published: post.published,
    };
    onEdit(updatedPost);
    setIsEditing(false);
  };
  const handleEdit = () => {
    if(post.user_id !== myId){
      alert("작성자가 아닙니다.");
      return;
    }

    setIsEditing(true);
  }

  return (
    <>
      <MenuContainer>
        <MenuItem onClick={handleEdit}>수정</MenuItem>
        <MenuItem onClick={onDelete}>삭제</MenuItem>
        <MenuItem onClick={onClose}>닫기</MenuItem>
      </MenuContainer>

      {isEditing && (
        <PostEditModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
          initialTitle={post.title}
          initialContent={post.body}
          postId={post.post_id}
        />
      )}
    </>
  );
};

export default PostMenu;
