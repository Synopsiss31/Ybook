import type { Conversation } from '../client';
import type { ConversationMessageModel } from './ConversationMessageModel';
import type { UserModel } from './UserModel';

export declare class ConversationModel implements Conversation {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  from: UserModel;

  fromId: number;

  to: UserModel | null;

  toId: number | null;

  messages: ConversationMessageModel[];
}
