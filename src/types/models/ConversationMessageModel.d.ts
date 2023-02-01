import type { ConversationMessage } from '../client';
import type { ConversationModel } from './ConversationModel';
import type { NotificationModel } from './NotificationModel';
import type { UserModel } from './UserModel';

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
