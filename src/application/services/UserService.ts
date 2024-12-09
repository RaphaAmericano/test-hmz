import { UserDeleteResultDto, UserFindByIdDto, UserUpdateResultDto } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async find_by_id(id:string): Promise<UserFindByIdDto | null> {
        return await this.userRepository.find_by_id(id);
    }

    public async find_all(page?: number, per_page?: number): Promise<any | null> {
        return await this.userRepository.find_all(page, per_page);
    }

    public async update(id:string, payload:any): Promise<UserUpdateResultDto | null> {
        return await this.userRepository.update(id, payload);
    }

    public async delete(id:string): Promise<UserDeleteResultDto | null> {
        return await this.userRepository.delete(id);
    }

}