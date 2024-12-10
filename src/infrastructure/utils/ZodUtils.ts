import { ZodError } from "zod";

export class ZodUtils {
    static formatErrorString(error: ZodError): string{
        return error.issues.map((issue) => {
            return `${issue.path.join('.')} is ${issue.message.toLowerCase()}`;
        }).join(', ');
    }
}