import { PostComment } from "../client";
import { UserModel } from "./UserModel";
import { PostModel } from "./PostModel";
export declare class PostCommentModel implements PostComment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserModel;
    post: PostModel;
    userId: number;
    postId: number;
    text: string;
}
