import { PrismaService } from "../services/PrismaService";
import { Prisma, Conversation } from "../client";
import { ConversationModel } from "../models";
export declare class ConversationsRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.ConversationDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | Conversation | Conversation[]): T;
    findUnique(args: Prisma.ConversationFindUniqueArgs): Promise<ConversationModel | null>;
    findFirst(args: Prisma.ConversationFindFirstArgs): Promise<ConversationModel | null>;
    findMany(args?: Prisma.ConversationFindManyArgs): Promise<ConversationModel[]>;
    create(args: Prisma.ConversationCreateArgs): Promise<ConversationModel>;
    update(args: Prisma.ConversationUpdateArgs): Promise<ConversationModel>;
    upsert(args: Prisma.ConversationUpsertArgs): Promise<ConversationModel>;
    delete(args: Prisma.ConversationDeleteArgs): Promise<ConversationModel>;
    deleteMany(args: Prisma.ConversationDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.ConversationUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.ConversationAggregateArgs): Promise<Prisma.GetConversationAggregateType<{
        where?: Prisma.ConversationWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.ConversationOrderByWithRelationInput>;
        cursor?: Prisma.ConversationWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.ConversationCountAggregateInputType;
        _avg?: Prisma.ConversationAvgAggregateInputType;
        _sum?: Prisma.ConversationSumAggregateInputType;
        _min?: Prisma.ConversationMinAggregateInputType;
        _max?: Prisma.ConversationMaxAggregateInputType;
    }>>;
}
