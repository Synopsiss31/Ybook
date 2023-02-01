import type { PostComment } from '../client';
import type { PostModel } from './PostModel';
import type { UserModel } from './UserModel';

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
