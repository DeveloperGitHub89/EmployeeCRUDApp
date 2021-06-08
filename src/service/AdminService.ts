import { Admin } from "../models/Admin";
import { GenericService } from "./GenericService";

export interface AdminService extends GenericService<Admin> {
    authenticate(phone: string, password: string): Promise<boolean>;
}