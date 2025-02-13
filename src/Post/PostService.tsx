// src/services/postService.ts
import { CreatePostReq, UpdatePostReq } from "../Data/post_model";

const API_URL = "http://localhost:8000/v1/post/";

export const fetchCreatePostFile = async (file: File, postId: number) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}${postId}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchGetPostFile = async (postId: number) => {
  try {
    const response = await fetch(`${API_URL}${postId}/files`);
    if (!response.ok) {
      throw new Error("Failed to Get File");
    }

    const data = `${API_URL}${postId}/files`;

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return;
  }
}

export const fetchPatchPost = async (postData: UpdatePostReq, postId:number) =>{
  try {
    const response = await fetch(`${API_URL}${postId}`,
      {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to patch api");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const fetchDeletePost = async (postId: number) => {
  try {
    const response = await fetch(`${API_URL}${postId}`, 
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

export const fetchCreatePost = async (postData: CreatePostReq) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return;
  }
};

export const likePost = async (postId: number, likeOption: string) => {
  try {
    const response = await fetch(`${API_URL}${postId}/like?like_op=${likeOption}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return;
  }
};
