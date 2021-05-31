import { Department } from "../models/Department";
import { GenericService } from "./GenericService";

export interface DepartmentService extends GenericService<Department> {
    save(requestBody: any): Promise<any>;
    findByIdWithEmployees(id: number): Promise<Department>;
}