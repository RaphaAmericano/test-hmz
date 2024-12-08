import { UserFindByIdDto } from "../entities/User";

export interface UserRepositoryProps {
    findByIdFunction: (id:string) => Promise<any | null >
}
export interface UserRepository {
    find_by_id(id: string): Promise<UserFindByIdDto | null>;
}