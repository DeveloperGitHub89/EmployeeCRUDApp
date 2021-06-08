import { Admin } from "../models/Admin";
import { GenericDao } from "./GenericDao";

export interface AdminDao extends GenericDao<Admin> {
    findPasswordByPhone(phone:string):Promise<any>;
}