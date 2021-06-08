import { Department } from "../models/Department";
import { GenericService } from "./GenericService";

export interface DepartmentService extends GenericService<Department> {
    findByIdWithEmployees(id: number): Promise<Department>;
}