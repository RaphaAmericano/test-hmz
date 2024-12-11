import { AuthCreateDto, AuthCreateSuccessDto } from "../../domain/entities/Auth";
import { AuthRepository } from "../../domain/interfaces/AuthRepository";
import { EncryptionService } from "./EncryptionService";

export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly encriptionService: EncryptionService
        // todo: criar o service de encriptar senha
    ) {}

    public async create(data: AuthCreateDto): Promise<AuthCreateSuccessDto | null> {
        const { password } = data
        const hashPassword = await this.encriptionService.hashPassword(password)
        return await this.authRepository.create({ ...data, password: hashPassword });
    }
}