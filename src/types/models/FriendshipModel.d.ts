import { Friendship } from "../client";
import { UserModel } from "./UserModel";
import { FriendshipStatus } from "../enums";
import { NotificationModel } from "./NotificationModel";
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
