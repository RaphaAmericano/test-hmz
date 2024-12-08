import { Auth } from "./Auth";

export interface UserId {
    id: string
}

export interface User extends UserId {
    first_name: string;
    last_name: string;
    avatar: string;
    created_at: string;
    updated_at: string;
    auth?: Auth;
}

export interface UserFindByIdDto extends Omit<User, "auth" | "created_at" | "updated_at"> {
    auth?: Pick<Auth, "username" | "email"> 
}

export interface UserFindResultDto extends Omit<User, "auth"> {
    email: string;
    username: string;
}

export interface UserUpdateDto {
    first_name?: string;
    last_name?: string;
    avatar?: string;
}