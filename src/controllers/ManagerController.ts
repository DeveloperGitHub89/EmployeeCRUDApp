import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { ResponseKey } from '../constants/ResponseKey';
import { ResponseMessage } from '../constants/ResponseMessage';
import { Admin } from '../models/Admin';
import { AdminServiceImpl } from '../serviceimpl/AdminServiceImpl';
import TYPES from '../types/DependencyInjectorSymbols/symbols';
import * as dotenv from 'dotenv';
import { ManagerServiceImpl } from '../serviceimpl/ManagerServiceImpl';
import { Manager } from '../models/Manager';
import { GenericController } from './GenericController';
import { AuthRole } from '../constants/AuthRole';
import { login } from '../utils/LoginUtil';
dotenv.config();

@injectable()
export class ManagerController extends GenericController<Manager> {
    private managerServiceImpl: ManagerServiceImpl;
    constructor(@inject(TYPES.ManagerServiceImpl) managerServiceImpl: ManagerServiceImpl) {
        super(managerServiceImpl);
        this.managerServiceImpl = managerServiceImpl;
        this.save = this.save.bind(this);
        this.login = this.login.bind(this);
    }
    async save(request: Request, response: Response): Promise<Response> {
        try {
            const id: number = await this.managerServiceImpl.save(request.body);
            return response.status(StatusCodes.CREATED).json({ [ResponseKey.MESSAGE]: ResponseMessage.ENTITY_CREATED });
        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                return response.status(StatusCodes.CONFLICT).json({ [ResponseKey.MESSAGE]: ResponseMessage.DUPLICATE_ENTITY });
            }
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error });
        }
    }
    
    async login(request: Request, response: Response): Promise<Response> {
        return await login(this.managerServiceImpl, request, response, AuthRole.MANAGER);
    }
}