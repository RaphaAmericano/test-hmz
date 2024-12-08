import express, { Router } from "express";
import authRouter from "../routes/AuthRoutes";
import userRouter from "../routes/UserRoutes";
import { PassportConfig } from "./config/PassportConfig";
import { JwtStrategyService } from "./strategies/JwtStrategy";
import { LocalStrategyService } from "./strategies/LocalStrategy";
import { AuthPrismaImplamantation } from "./database/prisma/implamantation/AuthPrismaImplamantation";

PassportConfig.configure('jwt', JwtStrategyService.getStrategy())
PassportConfig.configure('local', new LocalStrategyService(AuthPrismaImplamantation.find_by_username).getStategy());

const server = express();
const router = Router();
server.use(express.json());
router.use("/users", userRouter);
router.use("/", authRouter);

server.use("/api",  router);

export default server;
