export enum LIKE_OPTION {
    LIKE = 1,
    DISLIKE = -1,
  }

export interface Profile {
    user_id: number;
    username: string;
    bio: string;
    published?: boolean;
}
  
export interface CreateProfileReq {
    user_id: number;
    username: string;
    bio: string;
    published?: boolean;
}
  
export interface UpdateProfileReq {
    username?: string;
    bio?: string;
    published?: boolean;
}

export interface ProfileRes{
    username: string;
    bio: string;
    published: boolean;
    profile_pic_path:string;
    user_id: number;
}
  