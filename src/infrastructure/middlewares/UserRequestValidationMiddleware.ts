import { NextFunction, Request, Response } from "express";
import { UserId } from "../../domain/entities/User";
import { HttpResponse } from "../utils/HttpResponse";
import { ValidationResult } from "../validation/interfaces/Validation";

interface UserRequestValidationMiddlewareProps{
    validateUserUpdateFunction: (body: any) => ValidationResult
}

export class UserRequestValidationMiddleware {

    private validateUserUpdateFunction: (body: any) => ValidationResult

    constructor(props: UserRequestValidationMiddlewareProps) { 
        this.validateUserUpdateFunction = props.validateUserUpdateFunction
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

}