export interface AuthId {
  id: string;
}
export interface Auth extends AuthId {
  password: string;
  username: string;
  email: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface AuthCreateDto extends Pick<Auth, "password" | "username" | "email"> {}

export interface AuthCreateSuccessDto extends Auth {
  user_id: string;
}
