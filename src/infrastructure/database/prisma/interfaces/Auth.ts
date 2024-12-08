import { Auth, Prisma } from '@prisma/client';

export interface PrismaCreateAuthDto extends Omit<Prisma.AuthCreateInput, 'user'> {}

export interface PrismaCreateSuccessDto extends Auth {}

export interface PrismaFindAuthDto extends Prisma.AuthWhereInput {}