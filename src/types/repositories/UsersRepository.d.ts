import { PrismaService } from "../services/PrismaService";
import { Prisma, User } from "../client";
import { UserModel } from "../models";
export declare class UsersRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | User | User[]): T;
    findUnique(args: Prisma.UserFindUniqueArgs): Promise<UserModel | null>;
    findFirst(args: Prisma.UserFindFirstArgs): Promise<UserModel | null>;
    findMany(args?: Prisma.UserFindManyArgs): Promise<UserModel[]>;
    create(args: Prisma.UserCreateArgs): Promise<UserModel>;
    update(args: Prisma.UserUpdateArgs): Promise<UserModel>;
    upsert(args: Prisma.UserUpsertArgs): Promise<UserModel>;
    delete(args: Prisma.UserDeleteArgs): Promise<UserModel>;
    deleteMany(args: Prisma.UserDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.UserUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.UserAggregateArgs): Promise<Prisma.GetUserAggregateType<{
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>;
        cursor?: Prisma.UserWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.UserCountAggregateInputType;
        _avg?: Prisma.UserAvgAggregateInputType;
        _sum?: Prisma.UserSumAggregateInputType;
        _min?: Prisma.UserMinAggregateInputType;
        _max?: Prisma.UserMaxAggregateInputType;
    }>>;
}
