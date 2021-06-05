import { DepartmentController } from "../controllers/DepartmentController";
import { Router } from "express";
import container from "../config/inversify.config";
import { CommonRoute } from "./CommonRoute";

export class DepartmentRoutes extends CommonRoute{
    private static ROUTER: Router = Router();
    private static CONTROLLER: DepartmentController = container.resolve<DepartmentController>(DepartmentController);
    static getRoutes(): Router {
        super.getCommonRoutes(DepartmentRoutes.ROUTER, DepartmentRoutes.CONTROLLER);
        DepartmentRoutes.ROUTER.get('/:id/employees', DepartmentRoutes.CONTROLLER.findByIdWithEmployees);
        return DepartmentRoutes.ROUTER;
    }
}