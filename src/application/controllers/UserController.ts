import { Request, Response } from "express";

export class UserController {
    constructor() {}

    async get_user(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }

    async get_user_by_id(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }

    async update_user(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }

    async delete_user(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }
}