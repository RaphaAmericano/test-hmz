import { Auth, AuthCreateDto, AuthCreateSuccessDto } from "../../../domain/entities/Auth";
import { AuthRepository, AuthRepositoryProps } from "../../../domain/interfaces/AuthRepository";

export class AuthRepositoryImpl implements AuthRepository {
  private readonly createFunction: (
    payload: AuthCreateDto
  ) => Promise<AuthCreateSuccessDto | null>;

  constructor(props: AuthRepositoryProps) {
    this.createFunction = props.createFunction;
  }

  async create(payload: AuthCreateDto): Promise<AuthCreateSuccessDto | null> {
    return this.createFunction(payload);
  }
}
