import { ConversationMessage } from "../client";
import { ConversationModel } from "./ConversationModel";
import { UserModel } from "./UserModel";
import { NotificationModel } from "./NotificationModel";
export declare class ConversationMessageModel implements ConversationMessage {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    conversation: ConversationModel | null;
    conversationId: number | null;
    from: UserModel;
    userId: number;
    notification: NotificationModel[];
    content: string;
}
