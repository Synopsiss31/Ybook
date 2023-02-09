import { PrismaService } from "../services/PrismaService";
import { Prisma, Friendship } from "../client";
import { FriendshipModel } from "../models";
export declare class FriendshipsRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.FriendshipDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | Friendship | Friendship[]): T;
    findUnique(args: Prisma.FriendshipFindUniqueArgs): Promise<FriendshipModel | null>;
    findFirst(args: Prisma.FriendshipFindFirstArgs): Promise<FriendshipModel | null>;
    findMany(args?: Prisma.FriendshipFindManyArgs): Promise<FriendshipModel[]>;
    create(args: Prisma.FriendshipCreateArgs): Promise<FriendshipModel>;
    update(args: Prisma.FriendshipUpdateArgs): Promise<FriendshipModel>;
    upsert(args: Prisma.FriendshipUpsertArgs): Promise<FriendshipModel>;
    delete(args: Prisma.FriendshipDeleteArgs): Promise<FriendshipModel>;
    deleteMany(args: Prisma.FriendshipDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.FriendshipUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.FriendshipAggregateArgs): Promise<Prisma.GetFriendshipAggregateType<{
        where?: Prisma.FriendshipWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.FriendshipOrderByWithRelationInput>;
        cursor?: Prisma.FriendshipWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.FriendshipCountAggregateInputType;
        _avg?: Prisma.FriendshipAvgAggregateInputType;
        _sum?: Prisma.FriendshipSumAggregateInputType;
        _min?: Prisma.FriendshipMinAggregateInputType;
        _max?: Prisma.FriendshipMaxAggregateInputType;
    }>>;
}
