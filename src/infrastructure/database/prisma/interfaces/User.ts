import { Prisma } from "@prisma/client";

export interface PrismaCreateUserDto extends Prisma.UserCreateInput {}

export interface PrismaFindUserByIdResultDto extends Prisma.UserGetPayload<{
    select: {
        id: true,
        first_name: true,
        last_name: true,
        avatar: true,
        auth: {
            select: {
                username: true,
                email: true
            }
        }
    }
}> {}