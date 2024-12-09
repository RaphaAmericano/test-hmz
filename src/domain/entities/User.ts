import { Auth } from "./Auth";

export interface UserId {
    id: string
}

export interface User extends UserId {
    first_name?: string | null;
    last_name?: string | null;
    avatar?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string ;
    auth?: Auth;
}

export interface UserFindByIdDto extends Omit<User, "auth" | "created_at" | "updated_at"> {
    auth?: Pick<Auth, "username" | "email"> | null 
}

export interface UserFindResultDto extends User {
    // email: string;
    // username: string;
}

export interface UserUpdateDto {
    first_name?: string;
    last_name?: string;
    avatar?: string;
}

export interface UserUpdateResultDto extends User {
    auth?: Auth
    // email: string;
    // username: string;
}