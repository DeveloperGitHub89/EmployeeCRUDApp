import { db } from '../config/database';
import { injectable } from 'inversify';
import { GenericDaoImpl } from './GenericDaoImpl';
import { TableName } from '../constants/TableName';
import { Admin } from '../models/Admin';
import { AdminDao } from '../dao/AdminDao';
@injectable()
export class AdminDaoImpl extends GenericDaoImpl<Admin> implements AdminDao {
    constructor() {
        super(TableName.ADMINS, db);
    }
    async findPasswordByPhone(phone: string) {
        try {
            const encryptedPassword= await db<Admin>(TableName.ADMINS).where({ phone: phone }).pluck('password');
            return encryptedPassword;
        } catch (error) {
            throw error;
        }
    }
//     async save(admin: Admin):Promise<any>{
//        try {
//            const id: number = await db(TableName.ADMINS).insert(admin);
//            return id;
//        } catch (error) {
//            throw error;
//        }
//    }
}