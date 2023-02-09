import { PrismaService } from "../services/PrismaService";
import { Prisma, PostAttachment } from "../client";
import { PostAttachmentModel } from "../models";
export declare class PostAttachmentsRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.PostAttachmentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | PostAttachment | PostAttachment[]): T;
    findUnique(args: Prisma.PostAttachmentFindUniqueArgs): Promise<PostAttachmentModel | null>;
    findFirst(args: Prisma.PostAttachmentFindFirstArgs): Promise<PostAttachmentModel | null>;
    findMany(args?: Prisma.PostAttachmentFindManyArgs): Promise<PostAttachmentModel[]>;
    create(args: Prisma.PostAttachmentCreateArgs): Promise<PostAttachmentModel>;
    update(args: Prisma.PostAttachmentUpdateArgs): Promise<PostAttachmentModel>;
    upsert(args: Prisma.PostAttachmentUpsertArgs): Promise<PostAttachmentModel>;
    delete(args: Prisma.PostAttachmentDeleteArgs): Promise<PostAttachmentModel>;
    deleteMany(args: Prisma.PostAttachmentDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.PostAttachmentUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.PostAttachmentAggregateArgs): Promise<Prisma.GetPostAttachmentAggregateType<{
        where?: Prisma.PostAttachmentWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.PostAttachmentOrderByWithRelationInput>;
        cursor?: Prisma.PostAttachmentWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.PostAttachmentCountAggregateInputType;
        _avg?: Prisma.PostAttachmentAvgAggregateInputType;
        _sum?: Prisma.PostAttachmentSumAggregateInputType;
        _min?: Prisma.PostAttachmentMinAggregateInputType;
        _max?: Prisma.PostAttachmentMaxAggregateInputType;
    }>>;
}
