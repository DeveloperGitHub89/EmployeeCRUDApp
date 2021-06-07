import { hashSync, compareSync } from "bcrypt";
import { inject, injectable } from "inversify";
import { ManagerDaoImpl } from "../daoimpl/ManagerDaoImpl";
import { Manager } from "../models/Manager";
import { ManagerService } from "../service/ManagerService";
import TYPES from "../types/DependencyInjectorSymbols/symbols";
import { GenericServiceImpl } from "./GenericServiceImpl";
@injectable()
export class ManagerServiceImpl extends GenericServiceImpl<Manager> implements ManagerService {
    private managerDaoImpl: ManagerDaoImpl;
    constructor(@inject(TYPES.ManagerDaoImpl) managerDaoImpl: ManagerDaoImpl) {
        super(managerDaoImpl);
        this.managerDaoImpl = managerDaoImpl;
    }

    async save(manager: Manager): Promise<any> {
        try {
            manager.password = hashSync(manager.password, 10);
            const id: number = await this.managerDaoImpl.save(manager);
            return id;
        } catch (error) {
            throw error;
        }
    }

    async authenticate(phone: string, password: string): Promise<boolean> {
        try {
            const encryptedPassword = await this.managerDaoImpl.findPasswordByPhone(phone);
            if (encryptedPassword[0] != undefined) {
                return compareSync(password, encryptedPassword[0]);
            }
            else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
}