import { AdminController } from "../controllers/AdminController";
import { Router } from "express";
import container from "../config/inversify.config";
import { CommonRoute } from "./CommonRoute";
import { verifyToken } from "../middleware/auth/VerifyToken";
import { AuthRole } from "../constants/AuthRole";

export class AdminRoutes extends CommonRoute {
    private static readonly ROUTER: Router = Router();
    private static readonly CONTROLLER: AdminController = container.resolve<AdminController>(AdminController);
    static getRoutes(): Router {
        super.getCommonRoutes(AdminRoutes.ROUTER, AdminRoutes.CONTROLLER, verifyToken([AuthRole.ADMIN]));
        AdminRoutes.ROUTER.post('/login', AdminRoutes.CONTROLLER.login);
        return AdminRoutes.ROUTER;
    }
}