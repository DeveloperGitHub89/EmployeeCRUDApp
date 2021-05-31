export interface GenericService<T>{
    findAll(): Promise<T[]>;
    find(pageNo: number, limit: number): Promise<T[]>;
    findById(id: number): Promise<T | undefined>;
    deleteById(id: number): Promise<any>;
}