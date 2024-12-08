import { Prisma } from "@prisma/client";

export interface PrismaCreateUserDto extends Prisma.UserCreateInput {}

export interface PrismaFindUserByIdResultDto extends Prisma.UserGetPayload<{
    include: {
        auth: {
            select: {
                username: true,
                email: true
            }
        }
    }
}> {}