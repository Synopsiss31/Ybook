import type { PostLike } from '../client';
import type { PostModel } from './PostModel';
import type { UserModel } from './UserModel';

export declare class PostLikeModel implements PostLike {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  user: UserModel;

  post: PostModel;

  userId: number;

  postId: number;
}
