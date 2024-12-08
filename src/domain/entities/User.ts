import { Auth } from "./Auth";

export interface User {
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    auth?: Auth;
}