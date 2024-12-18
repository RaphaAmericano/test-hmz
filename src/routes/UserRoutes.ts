import { Router } from "express"
import { UserController } from "../application/controllers/UserController"
import { AuthMiddleware } from "../infrastructure/middlewares/AuthMiddleware"
import { UserRepositoryImpl } from "../infrastructure/database/repositories/UserRepositoryImpl"
import { UserPrismaImplamantation } from "../infrastructure/database/prisma/implamantation/UserPrismaImplamantation"
import { UserService } from "../application/services/UserService"
import { UserRequestValidationMiddleware } from "../infrastructure/middlewares/UserRequestValidationMiddleware"
import { UserZod } from "../infrastructure/validation/zod/User"

const router = Router()

const userRepository = new UserRepositoryImpl({
    createFunction: UserPrismaImplamantation.create,
    findByIdFunction: UserPrismaImplamantation.find_by_id,
    findAllFunction: UserPrismaImplamantation.find_all,
    updateFunction: UserPrismaImplamantation.update,
    deleteFunction: UserPrismaImplamantation.delete
})
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const requestValidationMiddleware = new UserRequestValidationMiddleware({
    validateUserCreateFunction: UserZod.validate_user_create,
    validateUserFindAllFunction: UserZod.validate_user_find_all,
    validateUserParamFunction: UserZod.validate_user_param,
    validateUserUpdateFunction: UserZod.validate_user_update
})
const authMiddleware = new AuthMiddleware('jwt')

router.get("", requestValidationMiddleware.validate_users_find_all.bind(requestValidationMiddleware), authMiddleware.authenticate(), userController.get_users.bind(userController))
router.post("", requestValidationMiddleware.validate_user_create.bind(requestValidationMiddleware),authMiddleware.authenticate(), userController.create_user.bind(userController))
router.get("/:id", requestValidationMiddleware.validate_users_find_one.bind(requestValidationMiddleware), authMiddleware.authenticate(), userController.get_user_by_id.bind(userController))
router.put("/:id", requestValidationMiddleware.validate_user_update.bind(requestValidationMiddleware), authMiddleware.authenticate(), userController.update_user.bind(userController))
router.delete("/:id", requestValidationMiddleware.validate_user_delete.bind(requestValidationMiddleware), authMiddleware.authenticate(), userController.delete_user.bind(userController))

export default router