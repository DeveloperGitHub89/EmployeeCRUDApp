import { Employee } from "../models/Employee";
import { GenericDao } from "./GenericDao";
export interface EmployeeDao extends GenericDao<Employee> {
    findNames(id: number): Promise<Pick<Employee, "fname" | "lname">[]>;
    findbyDepartment(id: number): Promise<Employee[]>;
    findByNameStartsWith(name: string): Promise<Employee[]>;
    findByIdWithDepartment(id: number): Promise<any>;
}