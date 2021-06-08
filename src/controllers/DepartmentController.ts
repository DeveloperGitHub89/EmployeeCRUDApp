import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ResponseKey } from '../constants/ResponseKey';
import { Department } from '../models/Department';
import { DepartmentServiceImpl } from '../serviceimpl/DepartmentServiceImpl';
import TYPES from '../types/DependencyInjectorSymbols/symbols';
import { GenericController } from './GenericController';
@injectable()
export class DepartmentController extends GenericController<Department>{
    private departmentServiceImpl: DepartmentServiceImpl;
   
    constructor(@inject(TYPES.DepartmentServiceImpl) departmentServiceImpl: DepartmentServiceImpl) {
        super(departmentServiceImpl);
        this.departmentServiceImpl = departmentServiceImpl;
        this.findByIdWithEmployees=this.findByIdWithEmployees.bind(this);
    }
   
    
    async findByIdWithEmployees(request: Request, response: Response):Promise<Response> {
        try {
            const department: Department = await this.departmentServiceImpl.findByIdWithEmployees(parseInt(request.params.id));
            return response.status(StatusCodes.OK).json(department);
        } catch (error) {
            console.log(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }
    }
    
}