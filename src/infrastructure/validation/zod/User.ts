import { z } from "zod";
import { ValidationResult } from "../interfaces/Validation";
import { ZodUtils } from "../../utils/ZodUtils";

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

const userGetAllQuerySchema = z.object({
  page: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val ), 
    z.number().optional()
  ),
  per_page: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val ), 
    z.number().optional()
  ).optional(),
});


const userGetParamSchema = z.object({
  id: z.string().uuid(),
});

type UserInferUser = z.infer<typeof userSchema>;

const userSchemaCreate = userSchema
  .omit({ id: true, created_at: true, updated_at: true, auth: true })
  .extend({ email: z.string().email() })

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

  static validate_user_create(body: any): ValidationResult {
    const result = userSchemaCreate.safeParse(body);
    const data = result.data ?? body
    const error = result.success ? null : ZodUtils.formatErrorString(result.error);
    return { success: result.success, error: error || null, data  };
  }
  
  static validate_user_find_all(query: any): ValidationResult {
    const result = userGetAllQuerySchema.safeParse(query);
    const data = result.data ?? query
    const error = result.success ? null : ZodUtils.formatErrorString(result.error);
    return { success: result.success, error: error || null, data  };
  }

  static validate_user_update(body: any): ValidationResult {
    const result = userSchemaUpdate.safeParse(body);
    const data = result.data ?? body
    const error = result.success ? null : ZodUtils.formatErrorString(result.error);
    return { success: result.success, error: error || null, data  };
  }


  static validate_user_param(params: any): ValidationResult {
    const result = userGetParamSchema.safeParse(params);    
    const data = result.data ?? params
    const error = result.success ? null : ZodUtils.formatErrorString(result.error);
    return { success: result.success, error: error || null, data  };
  }

  
}
