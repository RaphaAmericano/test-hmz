import { Router } from "express"
import { UserController } from "../application/controllers/UserController"
import { AuthMiddleware } from "../infrastructure/middlewares/AuthMiddleware"
import { BearerTokenMiddleware } from "../infrastructure/middlewares/BearerTokenMiddleware"
import { TokenManager } from "../infrastructure/utils/TokenManager"
import { UserRepositoryImpl } from "../infrastructure/database/repositories/UserRepositoryImpl"
import { UserPrismaImplamantation } from "../infrastructure/database/prisma/implamantation/UserPrismaImplamantation"
import { UserService } from "../application/services/UserService"

const router = Router()

const userRepository = new UserRepositoryImpl({
    findByIdFunction: UserPrismaImplamantation.find_by_id
})

const userService = new UserService(userRepository)

const authMiddleware = new AuthMiddleware('local')
const bearerTokenMiddleware = new BearerTokenMiddleware(TokenManager.generateToken)

const userController = new UserController(userService)

router.get("", userController.get_users.bind(userController))

router.get("/:id", userController.get_user_by_id.bind(userController))
router.put("/:id", userController.update_user.bind(userController))
router.delete("/:id", userController.delete_user.bind(userController))

export default router