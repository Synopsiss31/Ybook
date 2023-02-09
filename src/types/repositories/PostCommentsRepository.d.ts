import { PrismaService } from "../services/PrismaService";
import { Prisma, PostComment } from "../client";
import { PostCommentModel } from "../models";
export declare class PostCommentsRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.PostCommentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | PostComment | PostComment[]): T;
    findUnique(args: Prisma.PostCommentFindUniqueArgs): Promise<PostCommentModel | null>;
    findFirst(args: Prisma.PostCommentFindFirstArgs): Promise<PostCommentModel | null>;
    findMany(args?: Prisma.PostCommentFindManyArgs): Promise<PostCommentModel[]>;
    create(args: Prisma.PostCommentCreateArgs): Promise<PostCommentModel>;
    update(args: Prisma.PostCommentUpdateArgs): Promise<PostCommentModel>;
    upsert(args: Prisma.PostCommentUpsertArgs): Promise<PostCommentModel>;
    delete(args: Prisma.PostCommentDeleteArgs): Promise<PostCommentModel>;
    deleteMany(args: Prisma.PostCommentDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.PostCommentUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.PostCommentAggregateArgs): Promise<Prisma.GetPostCommentAggregateType<{
        where?: Prisma.PostCommentWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.PostCommentOrderByWithRelationInput>;
        cursor?: Prisma.PostCommentWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.PostCommentCountAggregateInputType;
        _avg?: Prisma.PostCommentAvgAggregateInputType;
        _sum?: Prisma.PostCommentSumAggregateInputType;
        _min?: Prisma.PostCommentMinAggregateInputType;
        _max?: Prisma.PostCommentMaxAggregateInputType;
    }>>;
}
