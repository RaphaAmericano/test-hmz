import { Request, Response } from "express";
import { HttpResponse } from "../utils/HttpResponse";
import { AuthId } from "../../domain/entities/Auth";

export class BearerTokenMiddleware {
    constructor(private tokenGenerateFunction: (payload: any) => string) {}
    public successWithBearer(
        req: Request<{}, {}, {}, { }>, 
        res: Response<AuthId | null>): any {
        const { id } = req.user as AuthId 
        const token = this.tokenGenerateFunction({ id })
        return HttpResponse.success(res, { id,  token }); 
    }

    public successWithOnlyBearer(
        req: Request<{}, {}, {}, { }>, 
        res: Response<AuthId | null>): any {
        const { id } = req.user as AuthId 
        const token = this.tokenGenerateFunction({ id })
        return HttpResponse.success(res, { token }); 
    }
}

