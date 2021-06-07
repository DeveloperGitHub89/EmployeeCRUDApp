import { Admin } from "../models/Admin";
import { GenericService } from "./GenericService";

export interface AdminService extends GenericService<Admin> {
    save(object: any): Promise<any>;
    authenticate(phone: string, password: string): Promise<boolean>;
}