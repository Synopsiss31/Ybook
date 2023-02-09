import { PostLike } from "../client";
import { UserModel } from "./UserModel";
import { PostModel } from "./PostModel";
export declare class PostLikeModel implements PostLike {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserModel;
    post: PostModel;
    userId: number;
    postId: number;
}
