import styled from "styled-components";
import { useEffect, useState } from "react";
import { Post } from "../Data/post_model";
import CommentList from "../comment/CommentList";
import { fetchCreateComment } from "../comment/CommentService";
import { CreateCommentReq } from "../Data/comment_model";
import { USER_ID } from "../assets/Constant";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  width: 80vh;
  height: 80vh;
  border-radius: 10px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

const CommentInputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 10px;
`;

const CommentInput = styled.textarea`
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const PostClick = ({ post, onClose }: { post: Post; onClose: () => void }) => {
  const [comment, setComment] = useState("");
  const [myId, setMyId] = useState<number>(USER_ID);
  const [commentsUpdated, setCommentsUpdated] = useState<boolean>(false);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setMyId(Number(storedId));
    }
  }, []);

  const handleCommentSubmit = async () => {
    if (comment.trim()) {

      const commentParam: CreateCommentReq = {
        body: comment,
        user_id: myId,
        published: true,
      };
      
      await fetchCreateComment(post.post_id, commentParam);
      setComment("");
      setCommentsUpdated(prev => !prev);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
        <CommentContainer>
          <CommentList key={commentsUpdated.toString()} postId={post.post_id} />
        </CommentContainer>
        <CommentInputContainer>
          <CommentInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="댓글을 입력하세요..."
          />
          <SubmitButton onClick={handleCommentSubmit}>작성</SubmitButton>
        </CommentInputContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostClick;
