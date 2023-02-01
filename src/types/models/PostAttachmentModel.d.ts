import type { PostAttachment } from '../client';
import type { DocumentType } from '../enums';
import type { PostModel } from './PostModel';

export declare class PostAttachmentModel implements PostAttachment {
  id: number;

  post: PostModel;

  postId: number;

  type: DocumentType;

  s3Key: string;
}
