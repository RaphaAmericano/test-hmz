import { UserFindByIdDto } from "../../../domain/entities/User";
import { UserRepository, UserRepositoryProps } from "../../../domain/interfaces/UserRepository";


export class UserRepositoryImpl implements UserRepository { 
    private readonly findByIdFunction: (id: string) => Promise<UserFindByIdDto | null>;
    constructor(props: UserRepositoryProps) {
        this.findByIdFunction = props.findByIdFunction;
    }

    async find_by_id(id: string): Promise<UserFindByIdDto | null> {
        return await this.findByIdFunction(id);
    }

    async update(id: string, payload: any): Promise<any | null> {
        
    }

}