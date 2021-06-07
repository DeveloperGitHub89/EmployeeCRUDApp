import { Manager } from "../models/Manager";
import { GenericService } from "./GenericService";

export interface ManagerService extends GenericService<Manager> {
    save(object: any): Promise<any>;
    authenticate(phone: string, password: string): Promise<boolean>;
}