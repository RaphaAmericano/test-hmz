import { Response } from "express";

export class HttpResponse {
    public static error(res:Response, error: string = "Error message" , status:number = 400): Response{
        return res.status(status).json({ error })
    }

    public static success(res:Response, body: object, status:number = 200): Response{
        return res.status(status).json(body)
    }

    public static successVoid(res:Response, status:number = 204): Response{
        return res.status(status)
    }

}