import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ResponseKey } from '../constants/ResponseKey';
import { ResponseMessage } from '../constants/ResponseMessage';
import { Department } from '../models/Department';
import { DepartmentServiceImpl } from '../serviceimpl/DepartmentServiceImpl';
import TYPES from '../types/DependencyInjectorSymbols/symbols';
@injectable()
export class DepartmentController{
    private departmentServiceImpl: DepartmentServiceImpl;
    constructor(@inject(TYPES.DepartmentServiceImpl) departmentServiceImpl: DepartmentServiceImpl) {
        this.departmentServiceImpl = departmentServiceImpl;
        this.findAll = this.findAll.bind(this);
        this.save = this.save.bind(this);
        this.find=this.find.bind(this);
        this.deleteById= this.deleteById.bind(this);
        this.findByIdWithEmployees=this.findByIdWithEmployees.bind(this);
        this.findById= this.findById.bind(this);
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
    async deleteById(request: Request, response: Response): Promise<Response> {
        try {
            const deletedRows: number = await this.departmentServiceImpl.deleteById(parseInt(request.params.id));
            if (deletedRows > 0) {
                return response.status(StatusCodes.NO_CONTENT).json();
            }
            else {
                return response.status(StatusCodes.NOT_FOUND).json({ [ResponseKey.MESSAGE]: ResponseMessage.ENTITY_NOT_FOUND });
            }
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error });
        }
    }
    async findAll(request: Request, response: Response): Promise<Response> {
        try {
            const departments: Department[] = await this.departmentServiceImpl.findAll();
            return response.status(StatusCodes.OK).json(departments);
        } catch (error) {
            console.log(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }

    }
    async find(request: Request, response: Response): Promise<Response> {
        try {
            const departments: Department[] = await this.departmentServiceImpl.find(parseInt(request.params.pageNo), parseInt(request.params.limit));
            return response.status(StatusCodes.OK).json(departments);
        } catch (error) {
            console.log(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
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
    async findById(request: Request, response: Response): Promise<Response> {
        try {
            const data: Department | undefined = await this.departmentServiceImpl.findById(parseInt(request.params.id));
            if (data === undefined) {
                return response.status(StatusCodes.NOT_FOUND).json({ [ResponseKey.MESSAGE]: ResponseMessage.ENTITY_NOT_FOUND });
            }
            else {
                return response.status(StatusCodes.OK).json(data);
            }
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }
    }
}