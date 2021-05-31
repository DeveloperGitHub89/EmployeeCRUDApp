import { Employee } from "../models/Employee";
import { GenericService } from "./GenericService";

export interface EmployeeService extends GenericService<Employee>{
    findNames(id: number): Promise<Pick<Employee, "fname" | "lname">[]>;
    findByDepartment(id: number): Promise<Employee[]>;
    findByNameStartsWith(name: string): Promise<Employee[]>;
    findByIdWithDepartment(id: number): Promise<any>;
    save(requestBody: any, departmentId: number): Promise<any>;
}