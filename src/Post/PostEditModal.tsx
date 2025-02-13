import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchPatchPost } from "./PostService";
import { USER_ID } from "../assets/Constant";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTitle: string, updatedBody: string) => void; // 수정
  postId: number;
  initialTitle: string;
  initialContent: string;
}

const PostEditModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, onSave, postId, initialTitle, initialContent }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [myId,setMyId] = useState<number>(USER_ID);
    
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setMyId(Number(storedId));
    }
  }, []);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSave = async () => {
    try {
      const updatedPost = { title, body: content }; // `body`로 변경 (일관성 유지)
      const response = await fetchPatchPost(updatedPost, postId);
      if (response) {
        alert("게시글이 성공적으로 수정되었습니다.");
        onSave(title, content);
        onClose();
        window.location.reload(); // ✅ 수정 후 페이지 새로고침
      }
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };
  

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>게시글 수정</h3>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
        />
        <div>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onClose} style={{ marginLeft: "10px" }}>닫기</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostEditModal;
