import express, { Router } from "express";
import authRouter from "../routes/AuthRoutes";
import userRouter from "../routes/UserRoutes";
const server = express();
const router = Router();
server.use(express.json());
router.use("/users", userRouter);
router.use("/", authRouter);

server.use("/api",  router);

export default server;
