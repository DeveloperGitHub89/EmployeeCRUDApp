import { hashSync, compareSync } from "bcrypt";
import { inject, injectable } from "inversify";
import { AdminDaoImpl } from "../daoimpl/AdminDaoImpl";
import { Admin } from "../models/Admin";
import { AdminService } from "../service/AdminService";
import TYPES from "../types/DependencyInjectorSymbols/symbols";
import { GenericServiceImpl } from "./GenericServiceImpl";
@injectable()
export class AdminServiceImpl extends GenericServiceImpl<Admin> implements AdminService {
    private adminDaoImpl: AdminDaoImpl;
    constructor(@inject(TYPES.AdminDaoImpl) adminDaoImpl: AdminDaoImpl) {
        super(adminDaoImpl);
        this.adminDaoImpl = adminDaoImpl;
    }

    async save(admin: Admin): Promise<any> {
        try {
            admin.password=hashSync(admin.password,10);
            const id: number = await this.adminDaoImpl.save(admin);
            return id;
        } catch (error) {
            throw error;
        }
    }

    async authenticate(phone:string, password:string):Promise<boolean> {
        try {
            const encryptedPassword= await this.adminDaoImpl.findPasswordByPhone(phone);
            if (encryptedPassword[0]!=undefined) {
               return compareSync(password,encryptedPassword[0]);
            }
            else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
}