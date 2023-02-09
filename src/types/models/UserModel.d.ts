import { User } from "../client";
import { PostModel } from "./PostModel";
import { PostLikeModel } from "./PostLikeModel";
import { PostCommentModel } from "./PostCommentModel";
import { FriendshipModel } from "./FriendshipModel";
import { ConversationModel } from "./ConversationModel";
import { ConversationMessageModel } from "./ConversationMessageModel";
export declare class UserModel implements User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    firstname: string;
    lastname: string;
    email: string;
    avatarS3Key: string | null;
    coverPicS3Key: string | null;
    posts: PostModel[];
    postLikes: PostLikeModel[];
    postComment: PostCommentModel[];
    fromFriendship: FriendshipModel[];
    toFrienship: FriendshipModel[];
    blockedUsers: UserModel[];
    blockedByUsers: UserModel[];
    conversationsSent: ConversationModel[];
    conversationsReceived: ConversationModel[];
    conversationMessages: ConversationMessageModel[];
    config: any | null;
}
