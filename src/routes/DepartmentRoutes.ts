import { DepartmentController } from "../controllers/DepartmentController";
import { Router } from "express";
import container from "../config/inversify.config";
import { CommonRoute } from "./CommonRoute";
import { verifyToken } from "../middleware/auth/VerifyToken";
import { AuthRole } from "../constants/AuthRole";

export class DepartmentRoutes extends CommonRoute{
    private static readonly ROUTER: Router = Router();
    private static readonly CONTROLLER: DepartmentController = container.resolve<DepartmentController>(DepartmentController);
    static getRoutes(): Router {
        super.getCommonRoutes(DepartmentRoutes.ROUTER, DepartmentRoutes.CONTROLLER,verifyToken([AuthRole.MANAGER]));
        DepartmentRoutes.ROUTER.get('/:id/employees', [verifyToken([AuthRole.MANAGER])], DepartmentRoutes.CONTROLLER.findByIdWithEmployees);
        return DepartmentRoutes.ROUTER;
    }
}