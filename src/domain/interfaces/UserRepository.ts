import { UserDeleteResultDto, UserFindAllResultDto, UserFindByIdDto, UserUpdateResultDto } from "../entities/User";

export interface UserRepositoryProps {
    findByIdFunction: (id:string) => Promise<UserFindByIdDto | null >
    findAllFunction:(page?:number, per_page?:number) => Promise<UserFindAllResultDto | null>
    updateFunction: (id: string, payload: any) => Promise<UserUpdateResultDto | null >
    deleteFunction:(id:string) => Promise<UserDeleteResultDto | null>
}
export interface UserRepository {
    find_by_id(id: string): Promise<UserFindByIdDto | null>;
    find_all(page?:number, per_page?:number): Promise<UserFindAllResultDto | null>;
    update(id: string, payload: any): Promise<UserUpdateResultDto | null>;
    delete(id: string): Promise<UserDeleteResultDto | null>;
}
