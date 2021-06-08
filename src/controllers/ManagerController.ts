import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
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
        this.login = this.login.bind(this);
    }
    
    
    async login(request: Request, response: Response): Promise<Response> {
        return await login(this.managerServiceImpl, request, response, AuthRole.MANAGER);
    }
}