import { Department } from "../models/Department";
import { GenericDao } from "./GenericDao";

export interface DepartmentDao extends GenericDao<Department>{
    findByIdWithEmployees(id: number): Promise<any>;
}