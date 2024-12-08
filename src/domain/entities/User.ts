import { Auth } from "./Auth";

export interface UserId {
    id: string
}

export interface User extends UserId {
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    auth?: Auth;
}

export interface UserFindByIdDto extends Omit<User, "auth"> {
    auth: Pick<Auth, "password" | "username" | "email">
}

export interface UserFindResultDto extends Omit<User, "auth"> {
    email: string;
    username: string;
}
