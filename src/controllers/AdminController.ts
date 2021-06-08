import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
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
    }
    
    
    async login(request: Request, response: Response):Promise<Response>{
          return await login(this.adminServiceImpl,request,response,AuthRole.ADMIN);
    }
}