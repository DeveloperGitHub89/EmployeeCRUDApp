import { EmployeeController } from "../controllers/EmployeeController";
import { Router } from "express";
import container from "../config/inversify.config";
const employeeRouter = Router();
const employeeController: EmployeeController = container.resolve<EmployeeController>(EmployeeController);
employeeRouter.get('/', employeeController.findAll);
employeeRouter.get('/page/:pageNo/limit/:limit', employeeController.find);
employeeRouter.get('/:id/names',employeeController.findNames);
employeeRouter.get('/:id', employeeController.findById);
employeeRouter.get('/department/:id', employeeController.findByDepartment);
employeeRouter.get('/:id/department', employeeController.findByIdWithDepartment);
employeeRouter.get('/name/startswith/:name', employeeController.findByNameStartsWith);
employeeRouter.post('/department/:departmentId', employeeController.save);
employeeRouter.delete('/:id', employeeController.deleteById);

export default employeeRouter;