import { Router } from "express";
import container from "../config/inversify.config";
import { CommonRoute } from "./CommonRoute";
import { ManagerController } from "../controllers/ManagerController";
import { verifyToken } from "../middleware/auth/VerifyToken";
import { AuthRole } from "../constants/AuthRole";

export class ManagerRoutes extends CommonRoute {
    private static readonly ROUTER: Router = Router();
    private static readonly CONTROLLER: ManagerController = container.resolve<ManagerController>(ManagerController);
    static getRoutes(): Router {
        super.getCommonRoutes(ManagerRoutes.ROUTER, ManagerRoutes.CONTROLLER, verifyToken([AuthRole.MANAGER]));
        ManagerRoutes.ROUTER.post('/login', ManagerRoutes.CONTROLLER.login);
        return ManagerRoutes.ROUTER;
    }
}