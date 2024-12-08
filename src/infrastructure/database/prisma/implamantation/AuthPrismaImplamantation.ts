import { PrismaCreateAuthDto } from "../interfaces/Auth";
import { prisma } from "../prisma";
const { auth } = prisma;

export class AuthPrismaImplamantation {
  static async create(data: PrismaCreateAuthDto) {
    const result = await auth.create({
      data,
    });
    return result;
  }
}
