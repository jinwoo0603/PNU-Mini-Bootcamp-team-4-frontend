export interface Comment {
    post_id: number;
    user_id: number;
    comment_id: number;
    created_at: number;
    published: boolean;
    body: string;
}

export interface CreateCommentReq {
    user_id: number;
    body: string;
    published?: boolean;
}

export interface UpdateCommentReq {
    body?: string;
    published?: boolean;
}
