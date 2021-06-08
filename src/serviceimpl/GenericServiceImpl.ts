import { injectable } from "inversify";
import {GenericDaoImpl} from "../daoimpl/GenericDaoImpl";
@injectable()
export abstract class GenericServiceImpl<T>{
    private genericDaoImpl: GenericDaoImpl<T>;
    protected constructor(genericDaoImpl: GenericDaoImpl<T>) {
        this.genericDaoImpl=genericDaoImpl;
    }
    async save(object: T): Promise<any> {
        try {
            const id: number = await this.genericDaoImpl.save(object);
            return id;
        } catch (error) {
            throw error;
        }
    }
    async findAll(): Promise<T[]> {
        try {
            const objects: T[] = await this.genericDaoImpl.findAll();
            return objects;
        } catch (error) {
            throw error;
        }
    }
    // 07324 350035
    async find(pageNo: number, limit: number): Promise<T[]> {
        try {
            const offset: number = (pageNo - 1) * limit;
            const employees: T[] = await this.genericDaoImpl.find(limit, offset);
            return employees;
        } catch (error) {
            throw error;
        }
    }
    async findById(id: number): Promise<T | undefined> {
        try {
            const object: T | undefined = await this.genericDaoImpl.findById(id);
            return object;
        } catch (error) {
            throw error;
        }
    }
    async deleteById(id: number): Promise<any> {
        try {
            return await this.genericDaoImpl.deleteById(id);
        } catch (error) {
            throw error;
        }
    }
}