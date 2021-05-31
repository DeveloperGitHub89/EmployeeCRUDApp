import { inject, injectable } from "inversify";
import { DepartmentDaoImpl } from "../daoimpl/DepartmentDaoImpl";
import { Department } from "../models/Department";
import { DepartmentService } from "../service/DepartmentService";
import TYPES from "../types/DependencyInjectorSymbols/symbols";
import { GenericServiceImpl } from "./GenericServiceImpl";
@injectable()
export class DepartmentServiceImpl extends GenericServiceImpl<Department> implements DepartmentService{
    private departmentDaoImpl: DepartmentDaoImpl;
    constructor(@inject(TYPES.DepartmentDaoImpl) departmentDaoImpl: DepartmentDaoImpl) {
        super(departmentDaoImpl);
        this.departmentDaoImpl = departmentDaoImpl;
    }
    
    async save(department:Department): Promise<any>{
        try {
            const id: number = await this.departmentDaoImpl.save(department);
            return id;
        } catch (error) {
            throw error;
        }
    }
    
    async findByIdWithEmployees(id: number): Promise<Department>{
        try {
            const department: Department = await this.departmentDaoImpl.findByIdWithEmployees(id);
          return department;
        } catch (error) {
            throw error;
        }
    }
   
}