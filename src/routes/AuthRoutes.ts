import { Router } from "express"
import { AuthController } from "../application/controllers/AuthController"
import { AuthService } from "../application/services/AuthService"
import { AuthRepositoryImpl } from "../infrastructure/database/repositories/AuthRepositoryImpl"
import { AuthPrismaImplamantation } from "../infrastructure/database/prisma/implamantation/AuthPrismaImplamantation"
import { BearerTokenMiddleware } from "../infrastructure/middlewares/BearerTokenMiddleware"
import { TokenManager } from "../infrastructure/utils/TokenManager"
const router = Router()

const authRepository = new AuthRepositoryImpl({
    createFunction: AuthPrismaImplamantation.create
}) 
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

const bearerTokenMiddleware = new BearerTokenMiddleware(TokenManager.generateToken)

router.post("/login", authController.login.bind(authController))

router.post("/logout", authController.logout.bind(authController))

router.post("/register", authController.register.bind(authController), bearerTokenMiddleware.successWithBearer.bind(bearerTokenMiddleware))

export default router