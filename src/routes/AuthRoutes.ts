import { Router } from "express"
import { AuthController } from "../application/controllers/AuthController"
import { AuthService } from "../application/services/AuthService"
import { AuthRepositoryImpl } from "../infrastructure/database/repositories/AuthRepositoryImpl"
import { AuthPrismaImplamantation } from "../infrastructure/database/prisma/implamantation/AuthPrismaImplamantation"
import { BearerTokenMiddleware } from "../infrastructure/middlewares/BearerTokenMiddleware"
import { TokenManager } from "../infrastructure/utils/TokenManager"
import { AuthMiddleware } from "../infrastructure/middlewares/AuthMiddleware"
const router = Router()

const authRepository = new AuthRepositoryImpl({
    createFunction: AuthPrismaImplamantation.create
}) 
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

const authMiddleware = new AuthMiddleware('local')
const bearerTokenMiddleware = new BearerTokenMiddleware(TokenManager.generateToken)

router.post("/login", authMiddleware.authenticate(), authController.login.bind(authController), bearerTokenMiddleware.successWithOnlyBearer.bind(bearerTokenMiddleware))

router.post("/logout", authController.logout.bind(authController))

router.post("/register", authController.register.bind(authController), bearerTokenMiddleware.successWithBearer.bind(bearerTokenMiddleware))

export default router