import { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ResponseKey } from '../constants/ResponseKey';
import { ResponseMessage } from '../constants/ResponseMessage';
import { Employee } from '../models/Employee';
import { EmployeeServiceImpl } from '../serviceimpl/EmployeeServiceImpl';
import TYPES from '../types/DependencyInjectorSymbols/symbols';
import { GenericController } from './GenericController';
@injectable()
export class EmployeeController extends GenericController<Employee> {
    private employeeServiceImpl: EmployeeServiceImpl;
    constructor(@inject(TYPES.EmployeeServiceImpl) employeeServiceImpl: EmployeeServiceImpl) {
        super(employeeServiceImpl)
        this.employeeServiceImpl = employeeServiceImpl;
        this.findNames= this.findNames.bind(this);
        this.findByNameStartsWith=this.findByNameStartsWith.bind(this);
        this.save = this.save.bind(this);
        this.findByDepartment= this.findByDepartment.bind(this);
        this.findByIdWithDepartment= this.findByIdWithDepartment.bind(this);
    }
    async save(request: Request, response: Response): Promise<Response> {
       try {
           const id: number = await this.employeeServiceImpl.save(request.body);
        return response.status(StatusCodes.CREATED).json({ [ResponseKey.MESSAGE] :ResponseMessage.ENTITY_CREATED+" with id "+id});
       } catch (error) {
           console.log(error);
           if (error.errno===1062) {
               return response.status(StatusCodes.CONFLICT).json({ [ResponseKey.MESSAGE]: ResponseMessage.DUPLICATE_ENTITY});
           }
           return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error });
       }
    }
    
    async findNames(request: Request, response: Response): Promise<Pick<Employee, "fname" | "lname">[] | Response>{
        try {
            const data: Pick<Employee, "fname" | "lname">[] = await this.employeeServiceImpl.findNames(parseInt(request.params.id));
            return response.status(StatusCodes.OK).json(data);;
        } catch (error) {
            console.log(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }
    }
    
    async findByDepartment(request: Request, response: Response): Promise<Response> {
        try {
            const employees: Employee[] = await this.employeeServiceImpl.findByDepartment(parseInt(request.params.id));
           return response.status(StatusCodes.OK).json(employees);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }
    }

    async findByNameStartsWith(request: Request, response: Response): Promise<Response>{
        try {
            const employees: Employee[] = await this.employeeServiceImpl.findByNameStartsWith(request.params.name);
            return response.status(StatusCodes.OK).json(employees);
        } catch (error) {
            if (error instanceof TypeError) {
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message});
            }
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async findByIdWithDepartment(request: Request, response: Response): Promise<Response>{
        try {
            const employee = await this.employeeServiceImpl.findByIdWithDepartment(parseInt(request.params.id));
            return response.status(StatusCodes.OK).json(employee);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }
    }
}