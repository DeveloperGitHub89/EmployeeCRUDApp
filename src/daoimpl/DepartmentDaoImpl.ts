import { Department } from '../models/Department';
import { db } from '../config/database';
import { injectable } from 'inversify';
import { GenericDaoImpl } from './GenericDaoImpl';
import {definition} from './definition_objects/DepartmentObjectDefinition';
import { DepartmentDao } from '../dao/DepartmentDao';
import { TableName } from '../constants/TableName';
const NesthydrationJs = require('nesthydrationjs')();
@injectable()
export class DepartmentDaoImpl extends GenericDaoImpl<Department> implements DepartmentDao{
    constructor(){
        super(TableName.DEPARTMENTS,db);
    }
   async save(department: Department): Promise<any> {
       try {
           const id: number = await db(TableName.DEPARTMENTS).insert(department);
           return id;
       } catch (error) {
           throw error;
       }
    }
   async findByIdWithEmployees(id:number):Promise<any>{
     try {
         const department = await db<Department>(TableName.DEPARTMENTS)
             .innerJoin(TableName.EMPLOYEES, TableName.DEPARTMENTS + '.id', TableName.EMPLOYEES+'.department_id')
             .innerJoin(TableName.EMPLOYEE_ADDRESSES, TableName.EMPLOYEES + '.id', TableName.EMPLOYEE_ADDRESSES+'.employee_id')
             .select(TableName.DEPARTMENTS + '.id as id', 'name', 'description', 'location', 'employees.id as employee_id', 'fname', 'lname', 'phone', 'dob', 'salary', 'address', 'type')
             .where(TableName.DEPARTMENTS+'.id',id);
        const result=NesthydrationJs.nest(department,definition);
        return result;
     } catch (error) {
         throw error;
     }
   }
}