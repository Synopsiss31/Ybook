import { PrismaService } from "../services/PrismaService";
import { Prisma, PostLike } from "../client";
import { PostLikeModel } from "../models";
export declare class PostLikesRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.PostLikeDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | PostLike | PostLike[]): T;
    findUnique(args: Prisma.PostLikeFindUniqueArgs): Promise<PostLikeModel | null>;
    findFirst(args: Prisma.PostLikeFindFirstArgs): Promise<PostLikeModel | null>;
    findMany(args?: Prisma.PostLikeFindManyArgs): Promise<PostLikeModel[]>;
    create(args: Prisma.PostLikeCreateArgs): Promise<PostLikeModel>;
    update(args: Prisma.PostLikeUpdateArgs): Promise<PostLikeModel>;
    upsert(args: Prisma.PostLikeUpsertArgs): Promise<PostLikeModel>;
    delete(args: Prisma.PostLikeDeleteArgs): Promise<PostLikeModel>;
    deleteMany(args: Prisma.PostLikeDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.PostLikeUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.PostLikeAggregateArgs): Promise<Prisma.GetPostLikeAggregateType<{
        where?: Prisma.PostLikeWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.PostLikeOrderByWithRelationInput>;
        cursor?: Prisma.PostLikeWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.PostLikeCountAggregateInputType;
        _avg?: Prisma.PostLikeAvgAggregateInputType;
        _sum?: Prisma.PostLikeSumAggregateInputType;
        _min?: Prisma.PostLikeMinAggregateInputType;
        _max?: Prisma.PostLikeMaxAggregateInputType;
    }>>;
}
