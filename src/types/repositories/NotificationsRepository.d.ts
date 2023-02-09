import { PrismaService } from "../services/PrismaService";
import { Prisma, Notification } from "../client";
import { NotificationModel } from "../models";
export declare class NotificationsRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.NotificationDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | Notification | Notification[]): T;
    findUnique(args: Prisma.NotificationFindUniqueArgs): Promise<NotificationModel | null>;
    findFirst(args: Prisma.NotificationFindFirstArgs): Promise<NotificationModel | null>;
    findMany(args?: Prisma.NotificationFindManyArgs): Promise<NotificationModel[]>;
    create(args: Prisma.NotificationCreateArgs): Promise<NotificationModel>;
    update(args: Prisma.NotificationUpdateArgs): Promise<NotificationModel>;
    upsert(args: Prisma.NotificationUpsertArgs): Promise<NotificationModel>;
    delete(args: Prisma.NotificationDeleteArgs): Promise<NotificationModel>;
    deleteMany(args: Prisma.NotificationDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.NotificationUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.NotificationAggregateArgs): Promise<Prisma.GetNotificationAggregateType<{
        where?: Prisma.NotificationWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.NotificationOrderByWithRelationInput>;
        cursor?: Prisma.NotificationWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.NotificationCountAggregateInputType;
        _avg?: Prisma.NotificationAvgAggregateInputType;
        _sum?: Prisma.NotificationSumAggregateInputType;
        _min?: Prisma.NotificationMinAggregateInputType;
        _max?: Prisma.NotificationMaxAggregateInputType;
    }>>;
}
