import { Knex } from "knex";
import { injectable, unmanaged } from 'inversify';
import { GenericDao } from '../dao/GenericDao';
@injectable()
export abstract class GenericDaoImpl<T> implements GenericDao<T>{
    private tableName: string;
    private db: Knex<any, unknown[]>;
    protected constructor(@unmanaged() tableName: string, @unmanaged() db: Knex<any, unknown[]>){
       this.tableName = tableName;
       this.db = db;
   }
    
    // async save(modelObject: any): Promise<any> {
    //     try {

    //         const currentDateTime: Date = new Date();
    //         modelObject.created_at=currentDateTime;
    //         modelObject.updated_at = currentDateTime;
    //         const id = await this.db<T>(this.tableName).insert(modelObject);
    //         return id;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    async findAll(): Promise<T[]> {
        try {
            const objects: any = await this.db<T>(this.tableName).select();
            return objects;
        } catch (error) {
            throw error;
        }
    }
    async find(limit: number, offset: number): Promise<T[]> {
        try {
            const employees: any = await this.db<T>(this.tableName).select().limit(limit).offset(offset);
            return employees;
        } catch (error) {
            throw error;
        }
    }
    async findById(id: number): Promise<T | undefined> {
        try {
            const object: any | undefined = await this.db<T>(this.tableName).where(this.tableName + '.id', id).first();
            return object;
        } catch (error) {
            throw error;
        }
    }
    async deleteById(id: number): Promise<number> {
        try {
            const deletedRows: number = await this.db<T>(this.tableName).where(this.tableName+'.id',id).delete();
            return deletedRows;
        } catch (error) {
            throw error;
        }
    }
}