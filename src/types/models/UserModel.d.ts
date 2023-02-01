import type { User } from '../client';
import type { ConversationMessageModel } from './ConversationMessageModel';
import type { ConversationModel } from './ConversationModel';
import type { FriendshipModel } from './FriendshipModel';
import type { PostCommentModel } from './PostCommentModel';
import type { PostLikeModel } from './PostLikeModel';
import type { PostModel } from './PostModel';

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
