// src/services/postService.ts
import { CreateProfileReq, ProfileRes, UpdateProfileReq } from "../Data/profile_model";

const API_URL = "http://localhost:8000/v1/profile/";
const API_URL2 = "http://localhost:8000/v1/profile";

export const fetchDeleteProfile = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}${userId}?user_id=${userId}`, 
      {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed delete.");
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export const fetchUpdateProfile = async (data: UpdateProfileReq, user_id:number) => {
  try {
    const response = await fetch(`${API_URL}${user_id}?user_id=${user_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    return await response.json();
  } catch (error) {
    alert(error);
  }
}

export const fetchCreateProfile = async (data: CreateProfileReq) => {
  try {
    const response = await fetch(`${API_URL2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    return await response.json();
  } catch (error) {
    alert(error);
  }
};

export const fetchGetProfile = async (user_id: number): Promise<ProfileRes> => {
  const response = await fetch(`${API_URL}?user_id=${user_id}`);
  if (!response.ok) {
    throw new Error("Failed to get profile");
  }
  return await response.json();
};

export const fetchCreateProfilePic = async (file:File, user_id: number) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}${user_id}/upload-profile-pic`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      return await response.json();
    } catch (error) {
      alert(error);
    }
  };

  export const fetchGetProfilePic = async (user_id: number) => {
    try {
        const response = await fetch(`${API_URL}${user_id}/profile-pic`);
        if (!response.ok) {
          throw new Error("Failed to Get File");
        }
    
        const data = `${API_URL}${user_id}/profile-pic`;
    
        return data;
      } catch (error) {
        console.error("Error fetching posts:", error);
        return;
      }
  }
