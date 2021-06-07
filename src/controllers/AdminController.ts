import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ResponseKey } from '../constants/ResponseKey';
import { ResponseMessage } from '../constants/ResponseMessage';
import { Admin } from '../models/Admin';
import { AdminServiceImpl } from '../serviceimpl/AdminServiceImpl';
import TYPES from '../types/DependencyInjectorSymbols/symbols';
import * as dotenv from 'dotenv';
import { GenericController } from './GenericController';
import { AuthRole } from '../constants/AuthRole';
import { login } from '../utils/LoginUtil';
dotenv.config();

@injectable()
export class AdminController extends GenericController<Admin> {
    private adminServiceImpl: AdminServiceImpl;
    constructor(@inject(TYPES.AdminServiceImpl) adminServiceImpl: AdminServiceImpl) {
        super(adminServiceImpl);
        this.adminServiceImpl = adminServiceImpl;
        this.login=this.login.bind(this);
        this.save=this.save.bind(this);
    }
    async save(request: Request, response: Response): Promise<Response> {
        try {
            const id: number = await this.adminServiceImpl.save(request.body);
            return response.status(StatusCodes.CREATED).json({ [ResponseKey.MESSAGE]: ResponseMessage.ENTITY_CREATED });
        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                return response.status(StatusCodes.CONFLICT).json({ [ResponseKey.MESSAGE]: ResponseMessage.DUPLICATE_ENTITY });
            }
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error });
        }
    }
    
    async login(request: Request, response: Response):Promise<Response>{
          return await login(this.adminServiceImpl,request,response,AuthRole.ADMIN);
    }
}