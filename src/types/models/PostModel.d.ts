import type { Post } from '../client';
import type { PostAttachmentModel } from './PostAttachmentModel';
import type { PostCommentModel } from './PostCommentModel';
import type { PostLikeModel } from './PostLikeModel';
import type { UserModel } from './UserModel';

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
