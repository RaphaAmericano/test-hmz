import { UserFindByIdDto } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async find_by_id(id:string): Promise<UserFindByIdDto | null> {
        return await this.userRepository.find_by_id(id);
    }

    public async update(id:string, payload:any): Promise<any | null> {
        return await this.userRepository.update(id, payload);
    }
}