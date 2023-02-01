import type { Notification } from '../client';
import type { ConversationMessageModel } from './ConversationMessageModel';
import type { FriendshipModel } from './FriendshipModel';

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
