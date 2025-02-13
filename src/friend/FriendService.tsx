import { CreateFriendReq } from "../Data/friend_model";

const API_URL = "http://localhost:8000/v1/friend/";
const API_URL2 = "http://localhost:8000/v1/friend";

export const fetchDeleteFriend = async (friend: CreateFriendReq,userId : number) => {
  try {
    const response = await fetch(`${API_URL}${userId}`, 
      {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friend),
    });

    if (!response.ok) {
      throw new Error("이미 삭제된 사용자입니다.");
    }

    return await response.json();//성공했다는 문자열 받음

  } catch (error) {
    alert(error);
    throw error;
  }
}

export const fetchCreateFriend= async (friend: CreateFriendReq) => {
  try {
    const response = await fetch( `${API_URL2}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friend),
    });

    if (!response.ok) {
      throw new Error("Failed to create friend");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchGetFriends = async (userId: number) => {
    try {
      const response = await fetch( `${API_URL}${userId}/followings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to get friends");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
