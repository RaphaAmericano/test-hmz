import { Request, Response } from "express";

export class AuthController {
    constructor() {}
    public async login(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }

    public async logout(req: Request, res: Response) {
        res.send('logout');
    }

    public async register(req: Request, res: Response) {
        res.send('register');
    }

}