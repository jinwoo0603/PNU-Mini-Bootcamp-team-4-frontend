import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchDeleteComment, fetchGetComment } from "./CommentService";
import { Comment } from "../Data/comment_model";
import CommentModifyModal from "./CommentModifyModal";
import { USER_ID } from "../assets/Constant";

const StyledCommentList = styled.div`
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
`;

const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  margin-left: 5px;
  padding: 2px 5px;
  font-size: 12px;
  cursor: pointer;
`;

const CommentList = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  const [myId, setMyId] = useState<number>(USER_ID);
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setMyId(Number(storedId));
    }
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const data = await fetchGetComment(postId);
        setComments(data);
      } catch (err) {
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  const handleEdit = (comment: Comment) => {
    if (comment.user_id !== myId) {
      alert("작성자가 아닙니다.");
      return;
    }
    setEditingComment(comment);
  };

  const handleSave = (commentId: number, newText: string) => {
    setComments(
      comments.map((comment) =>
        comment.comment_id === commentId ? { ...comment, body: newText } : comment
      )
    );
    setEditingComment(null);
  };

  const handleDelete = async (commentId: number, comment: Comment) => {
    if (comment.user_id !== myId) {
      alert("작성자가 아닙니다.");
      return;
    }

    if (window.confirm("정말 삭제하시겠습니까?")) {
      setComments(comments.filter((comment) => comment.comment_id !== commentId));
      const success = await fetchDeleteComment(commentId);
      if (success) {
        alert("삭제를 성공했습니다.");
      }
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;
  if (comments.length === 0) return <p>아직 댓글이 없습니다.</p>;

  return (
    <StyledCommentList>
      <h3>댓글</h3>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.comment_id}>
            <span>
              <strong>{comment.user_id === -1 ? "비회원" : `익명[${comment.user_id}]`}</strong>: {comment.body}
            </span>
            <span>
              <Button onClick={() => handleEdit(comment)}>수정</Button>
              <Button onClick={() => handleDelete(comment.comment_id, comment)}>삭제</Button>
            </span>
          </CommentItem>
        ))}
      </ul>
      {editingComment && (
        <CommentModifyModal
          commentId={editingComment.comment_id}
          initialText={editingComment.body}
          onClose={() => setEditingComment(null)}
          onSave={handleSave}
        />
      )}
    </StyledCommentList>
  );
};

export default CommentList;
