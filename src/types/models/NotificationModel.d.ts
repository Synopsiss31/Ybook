import { Notification } from "../client";
import { FriendshipModel } from "./FriendshipModel";
import { ConversationMessageModel } from "./ConversationMessageModel";
export declare class NotificationModel implements Notification {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    read: boolean;
    friendship: FriendshipModel | null;
    friendshipId: number | null;
    message: ConversationMessageModel | null;
    conversationMessageId: number | null;
}
