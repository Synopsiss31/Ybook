import { Post } from "../client";
import { UserModel } from "./UserModel";
import { PostLikeModel } from "./PostLikeModel";
import { PostCommentModel } from "./PostCommentModel";
import { PostAttachmentModel } from "./PostAttachmentModel";
export declare class PostModel implements Post {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    htmlContent: string;
    user: UserModel;
    userId: number;
    postLikes: PostLikeModel[];
    postComments: PostCommentModel[];
    postAttachments: PostAttachmentModel[];
}
