export interface GenericService<T>{
    save(object: any): Promise<any>;
    findAll(): Promise<T[]>;
    find(pageNo: number, limit: number): Promise<T[]>;
    findById(id: number): Promise<T | undefined>;
    deleteById(id: number): Promise<any>;
}