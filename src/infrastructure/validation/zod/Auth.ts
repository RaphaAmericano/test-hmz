import { z } from "zod";
import { ValidationResult } from "../interfaces/Validation";
import { ZodUtils } from "../../utils/ZodUtils";

const authSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const authLoginSchema = authSchema.omit(({ email: true }))

export class AuthZod {
  static validate_register(body: any): ValidationResult {
    const result = authSchema.safeParse(body);
    const data = result.data ?? body
    const error = result.success ? null : ZodUtils.formatErrorString(result.error);
    return { success: result.success, error: error || null, data  };
  }

  static validate_login(body: any): ValidationResult {
    const result = authLoginSchema.safeParse(body);
    const data = result.data ?? body
    const error = result.success ? null : ZodUtils.formatErrorString(result.error);
    return { success: result.success, error: error || null, data  };
  }

}