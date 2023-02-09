import { PostAttachment } from "../client";
import { PostModel } from "./PostModel";
import { DocumentType } from "../enums";
export declare class PostAttachmentModel implements PostAttachment {
    id: number;
    post: PostModel;
    postId: number;
    type: DocumentType;
    s3Key: string;
}
