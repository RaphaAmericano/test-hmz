import { AuthCreateSuccessDto } from "../../../../domain/entities/Auth";
import { PrismaCreateAuthDto, PrismaCreateSuccessDto } from "../interfaces/Auth";
import { prisma } from "../prisma";
const { auth } = prisma;

export class AuthPrismaImplamantation {
  static async create(data: PrismaCreateAuthDto): Promise<AuthCreateSuccessDto> {
  
    const result = await auth.create({ 
      data: {
        ...data,
        user: {
          create: {
            first_name: "",
            last_name: ""
          }
        }
      },

     });

    return result as AuthCreateSuccessDto;
  }

  static async find_by_email(email: string): Promise<any> {
    const result = await auth.findUnique({
      where: {
        email,
      },
    });

    return result;
  }

  static async find_by_username(username: string): Promise<any> {
    const result = await auth.findUnique({
      where: {
        username,
      },
    });

    return result;
  }

}
