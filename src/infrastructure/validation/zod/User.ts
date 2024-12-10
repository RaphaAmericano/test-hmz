import { z, ZodType } from "zod";
import { User } from "../../../domain/entities/User";
import { ValidationResult } from "../interfaces/Validation";
import { ZodUtils } from "./Utils";

const userSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  avatar: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  auth: z
    .object({
      username: z.string(),
      email: z.string().email(),
    })
    .optional(),
});

type UserInferUser = z.infer<typeof userSchema>;

const userSchemaUpdate = userSchema
  .omit({ id: true, created_at: true, updated_at: true, auth: true })
  .partial()
//   .strip()
  .refine((data: object) =>
    Object.keys(data).some((key: string) => data[key as keyof typeof data] !== undefined),{
        message: "At least one field must be provided",
    }
  );

export class UserZod {
  static validate_user_update(body: any): ValidationResult {
    const result = userSchemaUpdate.safeParse(body);
    const data = result.data ?? body
    const error = result.success ? null : ZodUtils.formatErrorString(result.error);
    return { success: result.success, error: error || null, data  };
  }
}
