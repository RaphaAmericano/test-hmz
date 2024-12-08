import { Auth, AuthCreateDto } from "../../../../domain/entities/Auth";
import {
  AuthRepository,
  AuthRepositoryProps,
} from "../../../../domain/interfaces/AuthRepository";

export class AuthRepositoryImpl implements AuthRepository {
  private readonly createFunction: (
    payload: AuthCreateDto
  ) => Promise<Auth | null>;

  constructor(props: AuthRepositoryProps) {
    this.createFunction = props.createFunction;
  }

  async create(payload: AuthCreateDto): Promise<Auth | null> {
    return this.createFunction(payload);
  }
}
