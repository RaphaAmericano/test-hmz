import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { HttpResponse } from "../../infrastructure/utils/HttpResponse";
import { AuthCreateDto } from "../../domain/entities/Auth";

export class AuthController {
    constructor(private readonly authService: AuthService) {}
    public async login(req: Request, res: Response) {
        res.status(200).json({'login': 'login'});
    }

    public async logout(req: Request, res: Response) {
        res.send('logout');
    }

    public async register(
        req: Request<{}, {}, AuthCreateDto>, 
        res: Response<{ message: string, data?: { id: string } | null }>, 
        next: NextFunction): Promise<any> {
        const { body } = req
        const { data, error } = await PromiseHandle.wrapPromise(this.authService.create(body))

        if(error || data === null){
            return HttpResponse.error(res, error.message || 'Error to create user')
        }
        
        const { id } = data
        req.user = { id }
        console.log(req.user)
        next()

    }

}