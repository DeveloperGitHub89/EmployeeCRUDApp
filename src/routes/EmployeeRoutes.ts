import { EmployeeController } from "../controllers/EmployeeController";
import { Router } from "express";
import container from "../config/inversify.config";
import { CommonRoute } from "./CommonRoute";

export class EmployeeRoutes extends CommonRoute{
    private static ROUTER:Router=Router();
    private static CONTROLLER: EmployeeController = container.resolve<EmployeeController>(EmployeeController);
    static getRoutes():Router{
        super.getCommonRoutes(EmployeeRoutes.ROUTER, EmployeeRoutes.CONTROLLER);
        EmployeeRoutes.ROUTER.get('/:id/names', EmployeeRoutes.CONTROLLER.findNames);
        EmployeeRoutes.ROUTER.get('/department/:id', EmployeeRoutes.CONTROLLER.findByDepartment);
        EmployeeRoutes.ROUTER.get('/:id/department', EmployeeRoutes.CONTROLLER.findByIdWithDepartment);
        EmployeeRoutes.ROUTER.get('/name/startswith/:name', EmployeeRoutes.CONTROLLER.findByNameStartsWith);
        return EmployeeRoutes.ROUTER;
    }    
}
