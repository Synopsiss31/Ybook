import { PrismaService } from "../services/PrismaService";
import { Prisma, ConversationMessage } from "../client";
import { ConversationMessageModel } from "../models";
export declare class ConversationMessagesRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.ConversationMessageDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | ConversationMessage | ConversationMessage[]): T;
    findUnique(args: Prisma.ConversationMessageFindUniqueArgs): Promise<ConversationMessageModel | null>;
    findFirst(args: Prisma.ConversationMessageFindFirstArgs): Promise<ConversationMessageModel | null>;
    findMany(args?: Prisma.ConversationMessageFindManyArgs): Promise<ConversationMessageModel[]>;
    create(args: Prisma.ConversationMessageCreateArgs): Promise<ConversationMessageModel>;
    update(args: Prisma.ConversationMessageUpdateArgs): Promise<ConversationMessageModel>;
    upsert(args: Prisma.ConversationMessageUpsertArgs): Promise<ConversationMessageModel>;
    delete(args: Prisma.ConversationMessageDeleteArgs): Promise<ConversationMessageModel>;
    deleteMany(args: Prisma.ConversationMessageDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.ConversationMessageUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.ConversationMessageAggregateArgs): Promise<Prisma.GetConversationMessageAggregateType<{
        where?: Prisma.ConversationMessageWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.ConversationMessageOrderByWithRelationInput>;
        cursor?: Prisma.ConversationMessageWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.ConversationMessageCountAggregateInputType;
        _avg?: Prisma.ConversationMessageAvgAggregateInputType;
        _sum?: Prisma.ConversationMessageSumAggregateInputType;
        _min?: Prisma.ConversationMessageMinAggregateInputType;
        _max?: Prisma.ConversationMessageMaxAggregateInputType;
    }>>;
}
