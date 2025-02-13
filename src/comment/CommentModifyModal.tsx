import { useState } from "react";
import styled from "styled-components";
import { fetchPutComment } from "./CommentService";
import { UpdateCommentReq } from "../Data/comment_model";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  height: 8cqi;
  width: 40vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 2vh;
  cursor: pointer;
  color: gray;
`;

const Input = styled.input`
  margin-top: 2vh;
  width: 100%;
  height: 40%;
  margin-bottom: 10px;
  text-align: center;
  color: gray;
`;

interface CommentModifyModalProps {
  commentId: number;
  initialText: string;
  onClose: () => void;
  onSave: (commentId: number, newText: string) => void;
}

const CommentModifyModal = ({ commentId, initialText, onClose, onSave }: CommentModifyModalProps) => {
  const [text, setText] = useState(initialText);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        onSave(commentId, text);
        const updateCommentReq:UpdateCommentReq = {
            body : text
        }

        const success = await fetchPutComment(updateCommentReq,commentId);
        if (success) {
            alert("수정을 성공했습니다.");
        }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} />
      </ModalContent>
    </ModalOverlay>
  );
};

export default CommentModifyModal;
