import { Employee } from '../models/Employee';
import { db } from '../config/database';
import { injectable, optional } from 'inversify';
import { GenericDaoImpl } from './GenericDaoImpl';
import {definition} from './definition_objects/EmployeeObjectDefinition';
import { EmployeeAddress } from '../models/EmployeeAddress';
import { EmployeeDao } from '../dao/EmployeeDao';
import { Knex } from 'knex';
import { TableName } from '../constants/TableName';
const NesthydrationJs = require('nesthydrationjs')();
@injectable()
export class EmployeeDaoImpl extends GenericDaoImpl<Employee> implements EmployeeDao{
    constructor() {
        super(TableName.EMPLOYEES, db);
    }
    
    /* overriding save method from GenericDao */
    async save(employeeRequestObject: any,departmentId:number, txn: Knex.Transaction<any, any[]>):Promise<any>{
        try {
           const addresses:EmployeeAddress[]= employeeRequestObject.addresses;
           delete employeeRequestObject['addresses'];
           employeeRequestObject.department_id = departmentId;
           const id: number = await txn(TableName.EMPLOYEES).insert(employeeRequestObject);
           addresses.forEach((address) => address.employee_id = id);
           await txn(TableName.EMPLOYEE_ADDRESSES).insert(addresses);
           //txn.commit();
           return id;
       } catch (error) {
          // txn.rollback();
           throw error;
       }
    }
    async findNames(id:number): Promise<Pick<Employee, "fname" | "lname">[]>{
        try {
            const data: Pick<Employee, "fname" | "lname">[] = await db<Employee>(TableName.EMPLOYEES).where({id:id}).select('fname').select('lname');
            return data;
        } catch (error) {
            throw error;
        }
    }

    async findbyDepartment(id:number):Promise<Employee[]>{
          try {
              const employees: Employee[] = await db<Employee>(TableName.EMPLOYEES).where({department_id:id});
              return employees;
          } catch (error) {
              throw error;
          }
    }
    
    async findByNameStartsWith(name:string):Promise<Employee[]> {
        try {
            const pattern:string=name+'%';
            const employees: Employee[] = await db<Employee>(TableName.EMPLOYEES).where('fname','like',pattern).select();
          return employees;
        } catch (error) {
            throw error;
        }
        
    }
    
    async findByIdWithDepartment(id:number):Promise<any>{
        try {
            const employee = await db<Employee>(TableName.EMPLOYEES)
                .innerJoin(TableName.DEPARTMENTS, TableName.EMPLOYEES + '.department_id', 'departments.id')
                .innerJoin(TableName.EMPLOYEE_ADDRESSES, TableName.EMPLOYEES + '.id', TableName.EMPLOYEE_ADDRESSES+'.employee_id')
                .select(TableName.EMPLOYEES + '.id as id', 'fname', 'lname', 'phone', 'dob', 'salary', TableName.DEPARTMENTS+'.id as department_id','name','description','location','address','type')
                .where(TableName.EMPLOYEES + '.id', id);
            const result = NesthydrationJs.nest(employee, definition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    

}
