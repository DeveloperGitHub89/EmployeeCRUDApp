import { inject, injectable } from "inversify";
import { db } from '../config/database';
import { EmployeeDaoImpl } from "../daoimpl/EmployeeDaoImpl";
import { Employee } from "../models/Employee";
import { EmployeeService } from "../service/EmployeeService";
import TYPES from "../types/DependencyInjectorSymbols/symbols";
import { GenericServiceImpl } from "./GenericServiceImpl";

@injectable()
export class EmployeeServiceImpl extends GenericServiceImpl<Employee> implements EmployeeService{
    private employeeDaoImpl: EmployeeDaoImpl;
    constructor(@inject(TYPES.EmployeeDaoImpl) employeeDaoImpl: EmployeeDaoImpl) {
        super(employeeDaoImpl);
        this.employeeDaoImpl = employeeDaoImpl;
        
    }
  
    async findNames(id:number): Promise<Pick<Employee, "fname" | "lname">[]>{
        try {
            const data: Pick<Employee, "fname" | "lname">[] = await this.employeeDaoImpl.findNames(id);
            return data;
        } catch (error) {
           throw error; 
        }
    }
  
    async findByDepartment(id:number): Promise<Employee[]>{
        try {
            const employees: Employee[] = await this.employeeDaoImpl.findbyDepartment(id);
            return employees;
        } catch (error) {
            throw error;
        }
    }
    async findByNameStartsWith(name:string): Promise<Employee[]>{
        try {
            const employees: Employee[] = await this.employeeDaoImpl.findByNameStartsWith(name);
           return employees;
        } catch (error) {
             throw error;
        }
    }
    async findByIdWithDepartment(id:number): Promise<any>{
        try {
            const employee = await this.employeeDaoImpl.findByIdWithDepartment(id);
           return employee;
        } catch (error) {
            throw error;
        }
    }
    /* overriding save method from GenericServiceImpl */
    async save(requestBody:any): Promise<any>{
        const txn = await db.transaction();
       try {
           requestBody['txn']=txn;
           const id: number = await this.employeeDaoImpl.save(requestBody);
           txn.commit();
           return id;
       } catch (error) {
           txn.rollback();
           throw error;
       }
    }
  

}
