import { Router } from "express";
import UserController from "../controller/User";
const router = Router();

router.post("/api/users/auth", UserController.auth);

router.delete("/api/users/:id", UserController.delete);

router.put("/api/users/:id", UserController.update);

router.post("/api/users", UserController.create);

router.get("/api/users/:id", UserController.get);

router.get("/api/users", UserController.getAll);

export default router;
