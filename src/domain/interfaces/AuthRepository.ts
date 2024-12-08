import { Auth, AuthCreateDto } from "../entities/Auth";

export interface AuthRepositoryProps {
    createFunction: (payload:AuthCreateDto) => Promise<Auth | null>
}

export interface AuthRepository {
    create(payload:AuthCreateDto): Promise<Auth | null>;
}