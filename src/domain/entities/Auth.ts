export interface Auth {
    password: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface AuthCreateDto extends Pick<Auth, "password" | "email"> {
    username: string;
}