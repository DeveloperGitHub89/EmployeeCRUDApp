import { db } from '../config/database';
import { injectable } from 'inversify';
import { GenericDaoImpl } from './GenericDaoImpl';
import { TableName } from '../constants/TableName';
import { Manager } from '../models/Manager';
import { ManagerDao } from '../dao/ManagerDao';
@injectable()
export class ManagerDaoImpl extends GenericDaoImpl<Manager> implements ManagerDao {
    constructor() {
        super(TableName.MANAGERS, db);
    }
    async findPasswordByPhone(phone: string) {
        try {
            const encryptedPassword = await db<Manager>(TableName.MANAGERS).where({ phone: phone }).pluck('password');
            return encryptedPassword;
        } catch (error) {
            throw error;
        }
    }
    async save(manager: Manager): Promise<any> {
        try {
            const id: number = await db(TableName.MANAGERS).insert(manager);
            return id;
        } catch (error) {
            throw error;
        }
    }
}