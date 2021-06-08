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
    
    
    async findByIdWithEmployees(id: number): Promise<Department>{
        try {
            const department: Department = await this.departmentDaoImpl.findByIdWithEmployees(id);
          return department;
        } catch (error) {
            throw error;
        }
    }
   
}