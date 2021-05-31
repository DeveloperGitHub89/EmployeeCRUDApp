export interface GenericDao<T>{
   findAll():Promise<T[]>;
   find(limit: number, offset: number): Promise<T[]>;
   findById(id: number): Promise<T | undefined>;
   deleteById(id: number): Promise<number>;
}