import { PrismaService } from "../services/PrismaService";
import { Prisma, Post } from "../client";
import { PostModel } from "../models";
export declare class PostsRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.PostDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | Post | Post[]): T;
    findUnique(args: Prisma.PostFindUniqueArgs): Promise<PostModel | null>;
    findFirst(args: Prisma.PostFindFirstArgs): Promise<PostModel | null>;
    findMany(args?: Prisma.PostFindManyArgs): Promise<PostModel[]>;
    create(args: Prisma.PostCreateArgs): Promise<PostModel>;
    update(args: Prisma.PostUpdateArgs): Promise<PostModel>;
    upsert(args: Prisma.PostUpsertArgs): Promise<PostModel>;
    delete(args: Prisma.PostDeleteArgs): Promise<PostModel>;
    deleteMany(args: Prisma.PostDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.PostUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.PostAggregateArgs): Promise<Prisma.GetPostAggregateType<{
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.PostOrderByWithRelationInput>;
        cursor?: Prisma.PostWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.PostCountAggregateInputType;
        _avg?: Prisma.PostAvgAggregateInputType;
        _sum?: Prisma.PostSumAggregateInputType;
        _min?: Prisma.PostMinAggregateInputType;
        _max?: Prisma.PostMaxAggregateInputType;
    }>>;
}
