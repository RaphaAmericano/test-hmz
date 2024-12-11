import { NextFunction, Request, Response, } from "express";
import passport, { AuthenticateOptions } from "passport";
import { HttpResponse } from "../utils/HttpResponse";
import { UserId } from "../../domain/entities/User";

export class AuthMiddleware {
    private readonly strategyName: string
    private readonly options: AuthenticateOptions 
    constructor(strategyName: string, options?:AuthenticateOptions) {
        this.strategyName = strategyName;
        this.options = options ?? { session: false }
    }

    public authenticate() {
        return (req: Request<UserId | {}>, res: Response, next: NextFunction): void => {
            passport.authenticate(this.strategyName, this.options, (err: any | Error, user: any, info: any | { message: string }) => {
                if(err){
                    console.log(err)
                    return HttpResponse.error(res)
                    
                }
                if(!user){
                    return HttpResponse.error(res, "Unauthorized")
                }
                req.user = user
                return next()
            })(req,res, next);

        }
    }

}