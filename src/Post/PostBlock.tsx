import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Post, UpdatePostReq } from "../Data/post_model";
import { fetchDeletePost } from "./PostService";
import PostMenu from "./PostMenu";
import PostImage from "./PostImage";
import { USER_ID } from "../assets/Constant";

const PostContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background: #fff;
  margin: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 10px;
  color: #333;
`;

const Body = styled.p`
  color: #666;
`;

const LikeButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const DislikeButton = styled(LikeButton)`
  background-color: #dc3545;
  &:hover {
    background-color: #a71d2a;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  background-color: #fff;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;

interface PostBlockProps {
  post: Post;
  onLike: (postId: number, likeOption: string) => void;
  onClick: () => void;
  onDelete: (postId: number) => void;
}

const PostBlock = ({ post, onLike, onClick, onDelete }: PostBlockProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [myId,setMyId] = useState<number>(USER_ID);

  useEffect(() => {
      const storedId = localStorage.getItem("id");
      if (storedId) {
        setMyId(Number(storedId));
      }
    }, []);

  const handleDelete = async () => {
    if(post.user_id !== myId){
      alert("작성자가 아닙니다.");
      return;
    }
    const success = await fetchDeletePost(post.post_id);
    if (success) {
      onDelete(post.post_id);
      alert("삭제를 성공했습니다.");
    }
  };

  const handleEdit = (updatedPost: UpdatePostReq) => {};

  return (
    <PostContainer>
      <MenuButton onClick={() => setMenuVisible(!menuVisible)}>•••</MenuButton>
      <div >
        <div onClick={() => onLike(post.post_id, "1")}>
        <ImageContainer>
          <PostImage postId={post.post_id} />
        </ImageContainer>
        {menuVisible && (
         <PostMenu
         post={post}
         onClose={() => setMenuVisible(false)}
         onDelete={handleDelete}
         onEdit={handleEdit}
          />
        )}
         <div onClick={onClick}>
          <Title>제목 : {post.title}</Title>
          <Body>내용 : {post.body}</Body>
          <p>좋아요: {post.likes}개</p>
        </div>
      </div>
      </div>
      
      <DislikeButton onClick={() => onLike(post.post_id, "-1")}><AiOutlineHeart/></DislikeButton>
    </PostContainer>
  );
};

export default PostBlock;
