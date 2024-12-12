import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/HttpResponse";
import { ValidationResult } from "../validation/interfaces/Validation";

interface AuthRequestValidationMiddlewareProps{
    validateAuthRegisterFunction: (body:any) => ValidationResult,
    validateAuthLoginFunction: (body:any) => ValidationResult
    
}

export class AuthRequestValidationMiddleware {

    private validateAuthRegisterFunction: (body:any) => ValidationResult
    private validateAuthLoginFunction: (body:any) => ValidationResult
    
    constructor(props: AuthRequestValidationMiddlewareProps) { 
        this.validateAuthRegisterFunction = props.validateAuthRegisterFunction
        this.validateAuthLoginFunction = props.validateAuthLoginFunction
    }


    public validate_register(req: Request, res: Response, next: NextFunction): void {
        const { body } = req
        const validate = this.validateAuthRegisterFunction(body)
        if(!validate.success) {
            const error = typeof validate.error === "string" ? validate.error : "Invalid request payload"
            HttpResponse.error(res, error, 400)
            return 
        }
        req.body = validate.data ?? body
        next();
        return 
    }

    public validate_login(req: Request, res: Response, next: NextFunction): void {
        const { body } = req
        const validate = this.validateAuthLoginFunction(body)
        if(!validate.success) {
            const error = typeof validate.error === "string" ? validate.error : "Invalid request payload"
            HttpResponse.error(res, error, 400)
            return
        }
        req.params = validate.data ?? body
        next();
        return 
    }

}