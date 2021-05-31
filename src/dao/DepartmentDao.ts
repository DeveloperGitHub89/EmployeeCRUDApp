import { Department } from "../models/Department";
import { GenericDao } from "./GenericDao";

export interface DepartmentDao extends GenericDao<Department>{
    save(object: any): Promise<any>;
    findByIdWithEmployees(id: number): Promise<any>;
}