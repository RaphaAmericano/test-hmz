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
    auth?: Auth | null ;
}

export interface UserGetUserQuerysDto {
    page?: number;
    per_page?: number;
}

export interface UserCreateDto extends Pick<User,  "first_name" | "last_name" | "avatar"> { 
    email: string
}

// Interface representando o usuário criado
export interface UserCreateResultDto extends Pick<User, "id" > {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar: string | null;
    created_at: Date | string;
    updated_at: Date | string;
    auth?: {
      email: string;
    } | null;
  }
  

export interface UserFindByIdDto extends Omit<User, "auth" | "created_at" | "updated_at"> {
    auth?: Pick<Auth, "username" | "email"> | null 
}
export interface UserFindResultDto extends Omit<User, "auth"> {
    auth?: { email: string, username: string } | null
}

export interface UserUpdateDto {
    first_name?: string;
    last_name?: string;
    avatar?: string;
}

export interface UserUpdateResultDto extends User {
    auth?: Auth
}

export interface UserDeleteResultDto extends User {
    auth?: Auth
}

export interface UserFindAllResultDto {
    result:  UserFindResultDto[];
    count: number;
}