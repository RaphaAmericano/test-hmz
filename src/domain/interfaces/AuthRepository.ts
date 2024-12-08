import { Auth, AuthCreateDto, AuthCreateSuccessDto } from "../entities/Auth";

export interface AuthRepositoryProps {
    createFunction: (payload:AuthCreateDto) => Promise<AuthCreateSuccessDto | null>
}

export interface AuthRepository {
    create(payload:AuthCreateDto): Promise<AuthCreateSuccessDto | null>;
}