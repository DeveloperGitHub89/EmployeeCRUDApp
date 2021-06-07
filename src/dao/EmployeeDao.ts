import { Knex } from "knex";
import { Employee } from "../models/Employee";
import { GenericDao } from "./GenericDao";
export interface EmployeeDao extends GenericDao<Employee> {
    save(object: any,txn:Knex.Transaction<any, any[]>): Promise<any>;
    findNames(id: number): Promise<Pick<Employee, "fname" | "lname">[]>;
    findbyDepartment(id: number): Promise<Employee[]>;
    findByNameStartsWith(name: string): Promise<Employee[]>;
    findByIdWithDepartment(id: number): Promise<any>;
}