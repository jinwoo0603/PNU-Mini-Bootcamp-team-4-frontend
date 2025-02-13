import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchPosts, likePost, fetchDeletePost } from "./PostService";
import { Post } from "../Data/post_model";
import PostClick from "./PostClick";
import TopHeader from "../home/TopHeader";
import PostBlock from "./PostBlock";

const PostListContainer = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-top: 4vh;
  margin-bottom: 2vh;
`;

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postData = await fetchPosts();
        setPosts(postData);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleLike = async (postId: number, likeOption: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.post_id === postId
          ? { ...post, likes: post.likes + (likeOption === "1" ? 1 : -1) }
          : post
      )
    );
    await likePost(postId, likeOption);
  };

  const handleDeletePost = async (postId: number) => {
    const success = await fetchDeletePost(postId);
    if (success) {
      setPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
    }
  };

  return (
    <PostListContainer>
      <TopHeader />
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <PostBlock
            key={post.post_id}
            post={post}
            onLike={handleLike}
            onClick={() => setSelectedPost(post)}
            onDelete={handleDeletePost}
          />
        ))
      )}
      {selectedPost && <PostClick post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </PostListContainer>
  );
};

export default PostList;
