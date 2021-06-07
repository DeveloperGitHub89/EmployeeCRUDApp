import { EmployeeController } from "../controllers/EmployeeController";
import { Router } from "express";
import container from "../config/inversify.config";
import { CommonRoute } from "./CommonRoute";
import { verifyToken } from "../middleware/auth/VerifyToken";
import { AuthRole } from "../constants/AuthRole";
export class EmployeeRoutes extends CommonRoute{
    private static readonly ROUTER:Router=Router();
    private static readonly CONTROLLER: EmployeeController = container.resolve<EmployeeController>(EmployeeController);
    static getRoutes():Router{
        super.getCommonRoutes(EmployeeRoutes.ROUTER, EmployeeRoutes.CONTROLLER, verifyToken([AuthRole.ADMIN]));
        EmployeeRoutes.ROUTER.get('/:id/names', EmployeeRoutes.CONTROLLER.findNames);
        //EmployeeRoutes.ROUTER.get('/department/:id', [verifyToken(AuthRole.ADMIN),verifyToken(AuthRole.MANAGER)] , EmployeeRoutes.CONTROLLER.findByDepartment);
        EmployeeRoutes.ROUTER.get('/department/:id', verifyToken([AuthRole.ADMIN]), EmployeeRoutes.CONTROLLER.findByDepartment);
        EmployeeRoutes.ROUTER.get('/:id/department', verifyToken([AuthRole.ADMIN]), EmployeeRoutes.CONTROLLER.findByIdWithDepartment);
        EmployeeRoutes.ROUTER.get('/name/startswith/:name', verifyToken([AuthRole.ADMIN]), EmployeeRoutes.CONTROLLER.findByNameStartsWith);
        return EmployeeRoutes.ROUTER;
    }    
}