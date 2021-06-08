import { Manager } from "../models/Manager";
import { GenericDao } from "./GenericDao";

export interface ManagerDao extends GenericDao<Manager> {
    findPasswordByPhone(phone: string): Promise<any>;
}