import { Router } from "express";
import UserController from "../controllers/user-controller";

const router = Router();
router.get("/:token", UserController.getUser);
router.delete("/:token", UserController.logOutUser);
router.put("/:token", UserController.updateUser);
router.get("/all/:token", UserController.getAllUser);
export default router;
