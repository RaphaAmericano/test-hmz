import { NextFunction, Request, Response } from "express";
import { UserGetUserQuerysDto, UserId } from "../../domain/entities/User";
import { HttpResponse } from "../utils/HttpResponse";
import { ValidationResult } from "../validation/interfaces/Validation";

interface UserRequestValidationMiddlewareProps{
    validateUserCreateFunction: (body: any) => ValidationResult,
    validateUserFindAllFunction: (query: UserGetUserQuerysDto) => ValidationResult,
    validateUserParamFunction: (params: UserId) => ValidationResult
    validateUserUpdateFunction: (body: any) => ValidationResult
}

export class UserRequestValidationMiddleware {

    private validateUserCreateFunction: (body: any) => ValidationResult
    private validateUserFindAllFunction: (query: UserGetUserQuerysDto) => ValidationResult
    private validateUserParamFunction: (params: UserId) => ValidationResult
    private validateUserUpdateFunction: (body: any) => ValidationResult
    constructor(props: UserRequestValidationMiddlewareProps) { 
        this.validateUserCreateFunction = props.validateUserCreateFunction
        this.validateUserFindAllFunction = props.validateUserFindAllFunction
        this.validateUserParamFunction = props.validateUserParamFunction
        this.validateUserUpdateFunction = props.validateUserUpdateFunction
    }

    public validate_user_create(req: Request, res: Response, next: NextFunction): void {
        const { body } = req
        const validate = this.validateUserCreateFunction(body)
        if(!validate.success) {
            const error = typeof validate.error === "string" ? validate.error : "Invalid request payload"
            HttpResponse.error(res, error, 400)
            return
        }
        next();
    }
    public validate_users_find_all(req: Request, res: Response, next: NextFunction): void {
        const { query } = req
        const validate = this.validateUserFindAllFunction(query)
        if(!validate.success) {
            const error = typeof validate.error === "string" ? validate.error : "Invalid request payload"
            HttpResponse.error(res, error, 400)
            return
        }
        req.query = validate.data ?? query
        next();
    }

    public validate_users_find_one(req: Request<UserId, {}, {}>, res: Response, next: NextFunction): void {
        const { params } = req
        const validate = this.validateUserParamFunction(params)
        if(!validate.success) {
            const error = typeof validate.error === "string" ? validate.error : "Invalid request payload"
            HttpResponse.error(res, error, 400)
            return
        }
        req.params = validate.data ?? params
        next();
    }

    public validate_user_update(req: Request<UserId>, res: Response, next: NextFunction): void {
        const { params, body } = req
        const { id } = params
        if(!id) {
            HttpResponse.error(res, "Invalid user id", 400)
        }
        const validate = this.validateUserUpdateFunction(body)
        if(!validate.success) {
            const error = typeof validate.error === "string" ? validate.error : "Invalid request payload"
            HttpResponse.error(res, error, 400)
            return 
        }
        req.body = validate.data ?? body
        next();
    }

    public validate_user_delete(req: Request<UserId>, res: Response, next: NextFunction): void {
        const { params } = req
        const validate = this.validateUserParamFunction(params)
        if(!validate.success) {
            const error = typeof validate.error === "string" ? validate.error : "Invalid request payload"
            HttpResponse.error(res, error, 400)
            return
        }
        req.params = validate.data ?? params
        next();
    }

}