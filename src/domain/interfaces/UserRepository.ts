import { UserFindByIdDto, UserUpdateResultDto } from "../entities/User";

export interface UserRepositoryProps {
    findByIdFunction: (id:string) => Promise<UserFindByIdDto | null >
    updateFunction: (id: string, payload: any) => Promise<UserUpdateResultDto | null >
}
export interface UserRepository {
    find_by_id(id: string): Promise<UserFindByIdDto | null>;
    update(id: string, payload: any): Promise<UserUpdateResultDto | null>;
}