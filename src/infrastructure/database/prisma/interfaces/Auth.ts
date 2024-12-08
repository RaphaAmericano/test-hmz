import { Prisma } from '@prisma/client';

export interface PrismaCreateAuthDto extends Prisma.AuthCreateInput {}

export interface PrismaFindAuthDto extends Prisma.AuthWhereInput {}