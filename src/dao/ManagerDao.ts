import { Manager } from "../models/Manager";
import { GenericDao } from "./GenericDao";

export interface ManagerDao extends GenericDao<Manager> {
    save(object: any): Promise<any>;
    findPasswordByPhone(phone: string): Promise<any>;
}