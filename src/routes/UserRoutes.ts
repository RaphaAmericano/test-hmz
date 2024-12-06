import { Router } from "express"
const router = Router()

router.get("/", (req, res) => {
  res.status(200).json({ message: "User list" })
})

router.get("/:id", (req, res) => {
    res.status(200).json({ message: "Get User" })
})
router.put("/:id", (req, res) => {
    res.status(200).json({ message: "Edit User" })
})
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: "Delete User" })
})

export default router