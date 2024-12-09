import { UserDeleteResultDto, UserFindByIdDto } from "../../../domain/entities/User";
import { UserRepository, UserRepositoryProps } from "../../../domain/interfaces/UserRepository";


export class UserRepositoryImpl implements UserRepository { 
    private readonly findByIdFunction: (id: string) => Promise<UserFindByIdDto | null>;
    private readonly updateFunction:(id:string, payload:any ) => Promise<any | null>;
    private readonly deleteFunction:(id:string) => Promise<UserDeleteResultDto | null>;
    constructor(props: UserRepositoryProps) {
        this.findByIdFunction = props.findByIdFunction;
        this.updateFunction = props.updateFunction;
        this.deleteFunction = props.deleteFunction;
    }

    async find_by_id(id: string): Promise<UserFindByIdDto | null> {
        return await this.findByIdFunction(id);
    }

    async update(id: string, payload: any): Promise<any | null> {
        return await this.updateFunction(id, payload);
    }

    async delete(id: string): Promise<UserDeleteResultDto | null> {
        return await this.deleteFunction(id);
    }

}