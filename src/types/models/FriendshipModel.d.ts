import type { Friendship } from '../client';
import type { FriendshipStatus } from '../enums';
import type { NotificationModel } from './NotificationModel';
import type { UserModel } from './UserModel';

export declare class FriendshipModel implements Friendship {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  from: UserModel;

  to: UserModel;

  status: FriendshipStatus;

  fromId: number;

  toId: number;

  notification: NotificationModel[];
}
