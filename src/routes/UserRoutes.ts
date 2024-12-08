import { Router } from "express"
import { UserController } from "../application/controllers/UserController"
const router = Router()
const userController = new UserController()

router.get("/", userController.get_user.bind(userController))

router.get("/:id", userController.get_user_by_id.bind(userController))
router.put("/:id", userController.update_user.bind(userController))
router.delete("/:id", userController.delete_user.bind(userController))

export default router