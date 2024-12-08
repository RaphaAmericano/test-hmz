import { UserRepository, UserRepositoryProps } from "../../../domain/interfaces/UserRepository";


export class UserRepositoryImpl implements UserRepository { 
    private readonly findByIdFunction: (id: string) => Promise<any | null>;
    constructor(props: UserRepositoryProps) {
        this.findByIdFunction = props.findByIdFunction;
    }

    async find_by_id(id: string): Promise<any | null> {
        return await this.findByIdFunction(id);
    }

}