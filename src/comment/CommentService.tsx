import { UpdateCommentReq, CreateCommentReq } from "../Data/comment_model";

const API_URL = "http://localhost:8000/v1/comment/";

export const fetchPutComment = async (commentData: UpdateCommentReq, commentId:number) =>{
  try {
    const response = await fetch(`${API_URL}${commentId}`,
      {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("Failed to patch api");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const fetchDeleteComment = async (commentId: number) => {
  try {
    const response = await fetch(`${API_URL}${commentId}`, 
      {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed delete.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const fetchCreateComment= async (postId:number, commentData: CreateCommentReq) => {
  try {
    const response = await fetch( `${API_URL}${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchGetComment = async (postID: number) => {
  try {
    const response = await fetch(`${API_URL}${postID}`);
    if (!response.ok) {
      throw new Error("Failed to get comments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return;
  }
};

