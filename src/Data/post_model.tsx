export enum LIKE_OPTION {
    LIKE = 1,
    DISLIKE = -1,
  }

export interface PostFile extends File{
    file_id: number;
    post_id: number;
    url : string;
    create_at: number;
}
  
export interface Post {
    post_id: number;
    user_id: number;
    title: string;
    body: string;
    created_at: number;
    published: boolean;
    likes: number;
}
  
export interface CreatePostReq {
    user_id: number;
    title: string;
    body: string;
    published?: boolean;
}
  
export interface UpdatePostReq {
    title?: string;
    body?: string;
    published?: boolean;
}
  