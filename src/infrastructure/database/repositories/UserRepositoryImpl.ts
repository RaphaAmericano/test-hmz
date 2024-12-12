import {
  UserDeleteResultDto,
  UserFindByIdDto,
  UserCreateResultDto,
  UserCreateDto
} from "../../../domain/entities/User";
import {
  UserRepository,
  UserRepositoryProps,
} from "../../../domain/interfaces/UserRepository";

export class UserRepositoryImpl implements UserRepository {
  private readonly createFunction:(
    payload: UserCreateDto
  ) => Promise<UserCreateResultDto | null>;

  private readonly findByIdFunction: (
    id: string
  ) => Promise<UserFindByIdDto | null>;

  private readonly updateFunction: (
    id: string,
    payload: any
  ) => Promise<any | null>;

  private readonly deleteFunction: (
    id: string
  ) => Promise<UserDeleteResultDto | null>;

  private readonly findAllFunction: (
    page?: number,
    per_page?: number
  ) => Promise<any | null>;

  constructor(props: UserRepositoryProps) {
    this.createFunction = props.createFunction;
    this.findByIdFunction = props.findByIdFunction;
    this.updateFunction = props.updateFunction;
    this.deleteFunction = props.deleteFunction;
    this.findAllFunction = props.findAllFunction;
  }

  async create(payload: any): Promise<UserCreateResultDto | null> {
    return await this.createFunction(payload);  
  }

  async find_by_id(id: string): Promise<UserFindByIdDto | null> {
    return await this.findByIdFunction(id);
  }

  async find_all(): Promise<any | null> {
    return await this.findAllFunction();
  }

  async update(id: string, payload: any): Promise<any | null> {
    return await this.updateFunction(id, payload);
  }

  async delete(id: string): Promise<UserDeleteResultDto | null> {
    return await this.deleteFunction(id);
  }
}
