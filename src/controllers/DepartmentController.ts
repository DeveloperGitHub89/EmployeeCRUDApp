import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ResponseKey } from '../constants/ResponseKey';
import { ResponseMessage } from '../constants/ResponseMessage';
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
        this.save = this.save.bind(this);
        this.findByIdWithEmployees=this.findByIdWithEmployees.bind(this);
    }
    async save(request: Request, response: Response): Promise<Response> {
        try {
            const id: number = await this.departmentServiceImpl.save(request.body);
            return response.status(StatusCodes.CREATED).json({ [ResponseKey.MESSAGE]: ResponseMessage.ENTITY_CREATED });
        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                return response.status(StatusCodes.CONFLICT).json({ [ResponseKey.MESSAGE]: ResponseMessage.DUPLICATE_ENTITY });
            }
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error });
        }
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