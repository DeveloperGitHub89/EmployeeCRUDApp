import { Admin } from "../models/Admin";
import { GenericDao } from "./GenericDao";

export interface AdminDao extends GenericDao<Admin> {
    save(object: any): Promise<any>;
    findPasswordByPhone(phone:string):Promise<any>;
}