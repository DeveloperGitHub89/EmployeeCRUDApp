export interface GenericDao<T>{
   save(object: any): Promise<any>;
   findAll():Promise<T[]>;
   find(limit: number, offset: number): Promise<T[]>;
   findById(id: number): Promise<T | undefined>;
   deleteById(id: number): Promise<number>;
}