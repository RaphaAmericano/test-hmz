import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserFindAllResultDto, UserFindResultDto, UserGetUserQuerysDto, UserId, UserUpdateResultDto } from "../../domain/entities/User";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { HttpResponse } from "../../infrastructure/utils/HttpResponse";

export class UserController {
    constructor(private readonly userService: UserService) {}

    async get_users(req: Request<{}, {}, {}, UserGetUserQuerysDto>, res: Response) {
        const { page = 1, per_page = 10} = req.query
        const { data, error } = await PromiseHandle.wrapPromise<UserFindAllResultDto | null>(this.userService.find_all(page, per_page))
        if(error || data === null){
            HttpResponse.error(res, error?.message || 'Error to get user')
        }
        const { result, count:total } = data
        const total_pages = Math.ceil(total / per_page)
        const mapResult = Array.isArray(result) ? result.map((user:UserFindResultDto) => {
            const { auth,  ...user_data } = user
            return { ...user_data, username: auth?.username, email: auth?.email }
        }) : []
        res.status(200).json({ page, per_page, total, total_pages, data:mapResult });
    }

    async get_user_by_id(req: Request<UserId, {}, {}>, res: Response, next: NextFunction) {
        const { id } = req.params
        const { data, error } = await PromiseHandle.wrapPromise<UserFindResultDto>(this.userService.find_by_id(id))
        if(error || data === null){
            HttpResponse.error(res, error?.message || 'Error to get user')
            return 
        }
        const { auth, ...user_data } = data
        HttpResponse.success(res, { ...user_data, ...auth } )
    }

    async update_user(req: Request<UserId, {}, {}>, res: Response) {
        const { id } = req.params
        const { data, error } = await PromiseHandle.wrapPromise<UserUpdateResultDto>(this.userService.update(id, req.body )) 
        if(error || data === null){
            HttpResponse.error(res, error.message || 'Error to edit user')
            return 
        }
        HttpResponse.success(res, data)
    }

    async delete_user(req: Request<UserId, {}, {}>, res: Response) {
        const { id } = req.params
        const { data, error } = await PromiseHandle.wrapPromise<any>(this.userService.delete(id))
        if(error || data === null){
            HttpResponse.error(res, 'Error to delete user')
            return 
        }
        HttpResponse.success(res, data)
    }
}