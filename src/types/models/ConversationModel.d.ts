import { Conversation } from "../client";
import { UserModel } from "./UserModel";
import { ConversationMessageModel } from "./ConversationMessageModel";
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
