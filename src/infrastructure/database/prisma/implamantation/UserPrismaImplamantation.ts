import { UserCreateDto, UserCreateResultDto, UserFindAllResultDto } from "../../../../domain/entities/User";
import { PrismaDeleteUserResultDto, PrismaFindUserByIdResultDto, PrismaUpdateUserDto, PrismaUpdateUserResultDto } from "../interfaces/User";
import { prisma } from "../prisma";
const { user } = prisma;

export class UserPrismaImplamantation {

  static async create(payload: UserCreateDto): Promise<UserCreateResultDto | null > {
    const { email, ...props } = payload
    const result = await user.create({
      data: {
        ...props,
        auth: {
          create: {
            email: email,
            username: email.split("@")[0],
            password: `${email.split("@")[0]}${props.first_name}`
          }
        }
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        avatar: true,
        created_at: true,
        updated_at: true,
        auth: {
          select: {
            email: true,
          }
        }
      }
    }
  );
    
    return result;
  }

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

    }
  );

    return result;
  }

  static async find_all(take?: number, skip?: number ): Promise<{ result:PrismaFindUserByIdResultDto[], count: number } | null> {
    const result:  PrismaFindUserByIdResultDto[] = await user.findMany({
      take,
      skip,
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
      }
    });
    const count = await user.count();
    return { result , count };
  }


  static async update(id: string, payload: PrismaUpdateUserDto): Promise<PrismaUpdateUserResultDto | null> {
    const result = await user.update({
      where: {
        id
      },
      data: payload
    });
    return result;
  }

  static async delete(id: string): Promise<PrismaDeleteUserResultDto | null > {
    const result = await user.delete({
      where: {
        id
      }
    });
    return result 
  }

}
