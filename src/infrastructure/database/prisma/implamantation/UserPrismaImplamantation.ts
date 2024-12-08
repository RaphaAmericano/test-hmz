import { PrismaFindUserByIdResultDto } from "../interfaces/User";
import { prisma } from "../prisma";
const { user } = prisma;

export class UserPrismaImplamantation {

  static async find_by_id(id: string): Promise<PrismaFindUserByIdResultDto | null> {
    const result = await user.findUnique({
      where: {
        id
      },
      select:{
        id: true,
        first_name: true,
        last_name: true,
        avatar: true,
        auth:{
          select:{
            email: true,
            username: true
          }
        }
      },
    });
    return result;
  }

  

}
