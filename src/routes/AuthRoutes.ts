import { Router } from "express"
import { AuthController } from "../application/controllers/AuthController"
import { AuthService } from "../application/services/AuthService"
import { AuthRepositoryImpl } from "../infrastructure/database/repositories/AuthRepositoryImpl"
import { AuthPrismaImplamantation } from "../infrastructure/database/prisma/implamantation/AuthPrismaImplamantation"
import { BearerTokenMiddleware } from "../infrastructure/middlewares/BearerTokenMiddleware"
import { TokenManager } from "../infrastructure/utils/TokenManager"
import { AuthMiddleware } from "../infrastructure/middlewares/AuthMiddleware"
import { AuthRequestValidationMiddleware } from "../infrastructure/middlewares/AuthRequestValidationMiddleware"
import { AuthZod } from "../infrastructure/validation/zod/Auth"
const router = Router()

const authRepository = new AuthRepositoryImpl({
    createFunction: AuthPrismaImplamantation.create
}) 
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)
const requestValidationMiddleware = new AuthRequestValidationMiddleware({
    validateAuthLoginFunction: AuthZod.validate_login,
    validateAuthRegisterFunction: AuthZod.validate_register
})
const authMiddleware = new AuthMiddleware('local')
const jwtMiddleware = new AuthMiddleware('jwt')
const bearerTokenMiddleware = new BearerTokenMiddleware(TokenManager.generateToken)

router.post("/login", requestValidationMiddleware.validate_login.bind(requestValidationMiddleware), authMiddleware.authenticate(), authController.login.bind(authController), bearerTokenMiddleware.successWithOnlyBearer.bind(bearerTokenMiddleware))
router.post("/logout", jwtMiddleware.authenticate(), authController.logout.bind(authController))
router.post("/register", requestValidationMiddleware.validate_register.bind(requestValidationMiddleware), authController.register.bind(authController), bearerTokenMiddleware.successWithBearer.bind(bearerTokenMiddleware))

export default router