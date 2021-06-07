import 'reflect-metadata';
import express from 'express';
import { DepartmentRoutes } from './src/routes/DepartmentRoutes';
import {  EmployeeRoutes } from './src/routes/EmployeeRoutes';
import { RoutePrefix } from './src/constants/RoutePrefix';
import cors from 'cors';
import helmet from 'helmet';
import { AdminRoutes } from './src/routes/AdminRoutes';
import { ManagerRoutes } from './src/routes/ManagerRoutes';
class App{
    private static server:express.Application;
    private static readonly PORT=8200;
    private static readonly allowedOrigins = ['http://localhost:3000'];
    
    private static serverConfig():void{
        const options: cors.CorsOptions = {
            origin: App.allowedOrigins
        };
        App.server.use(helmet())
        App.server.use(cors(options));
        App.server.use(express.json());
        App.server.use(express.urlencoded({ extended: true }));
    }
    private static serverRoutesConfig(){
        App.server.use(RoutePrefix.EMPLOYEE_ROUTE_PREFIX, EmployeeRoutes.getRoutes());
        App.server.use(RoutePrefix.DEPARTMENT_ROUTE_PREFIX, DepartmentRoutes.getRoutes());
        App.server.use(RoutePrefix.ADMIN_ROUTE_PREFIX, AdminRoutes.getRoutes());
        App.server.use(RoutePrefix.MANAGER_ROUTE_PREFIX, ManagerRoutes.getRoutes());
    }
     static startServer(){
        App.server = express();
        App.serverConfig();
        App.serverRoutesConfig();
        App.server.listen(App.PORT, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${this.PORT}`);
        });
    }
}
App.startServer();