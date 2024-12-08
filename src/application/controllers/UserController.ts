import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserFindResultDto, UserId } from "../../domain/entities/User";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { HttpResponse } from "../../infrastructure/utils/HttpResponse";

export class UserController {
    constructor(private readonly userService: UserService) {}

    async get_users(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }

    async get_user_by_id(req: Request<UserId, {}, {}>, res: Response, next: NextFunction) {
        const { id } = req.params
        const { data, error } = await PromiseHandle.wrapPromise<UserFindResultDto>(this.userService.find_by_id(id))
        if(error || data === null){
            HttpResponse.error(res, error.message || 'Error to get user')
        }
        const { auth, ...user_data } = data
        HttpResponse.success(res, { ...user_data, ...auth } )
    }

    async update_user(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }

    async delete_user(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }
}