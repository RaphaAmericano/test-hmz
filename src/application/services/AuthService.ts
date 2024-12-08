import { AuthCreateDto, AuthCreateSuccessDto } from "../../domain/entities/Auth";
import { AuthRepository } from "../../domain/interfaces/AuthRepository";

export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    public async create(data: AuthCreateDto): Promise<AuthCreateSuccessDto | null> {
        return await this.authRepository.create(data);
    }
}