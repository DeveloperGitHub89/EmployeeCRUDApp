import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import { ResponseKey } from '../constants/ResponseKey';
import { ResponseMessage } from '../constants/ResponseMessage';
import * as dotenv from 'dotenv';
import { GenericServiceImpl } from '../serviceimpl/GenericServiceImpl';
dotenv.config();

@injectable()
export abstract class GenericController<T> {
    private genericServiceImpl: GenericServiceImpl<T>;
    
    constructor(genericServiceImpl: GenericServiceImpl<T>) {
        this.genericServiceImpl = genericServiceImpl;
        this.deleteById = this.deleteById.bind(this);
        this.findAll = this.findAll.bind(this);
        this.find = this.find.bind(this);
        this.findById = this.findById.bind(this);
        this.save= this.save.bind(this);
    }

    async save(request: Request, response: Response): Promise<Response> {
        try {
            const id: number = await this.genericServiceImpl.save(request.body);
            return response.status(StatusCodes.CREATED).json({ [ResponseKey.MESSAGE]: ResponseMessage.ENTITY_CREATED });
        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                return response.status(StatusCodes.CONFLICT).json({ [ResponseKey.MESSAGE]: ResponseMessage.DUPLICATE_ENTITY });
            }
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error });
        }
    }
    async deleteById(request: Request, response: Response): Promise<Response> {
        try {
            const deletedRows: number = await this.genericServiceImpl.deleteById(parseInt(request.params.id));
            if (deletedRows > 0) {
                return response.status(StatusCodes.NO_CONTENT).json();
            }
            else {
                return response.status(StatusCodes.NOT_FOUND).json({ [ResponseKey.MESSAGE]: ResponseMessage.ENTITY_NOT_FOUND });
            }
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error });
        }
    }
    async findAll(request: Request, response: Response): Promise<Response> {
        try {
            const objects: T[] = await this.genericServiceImpl.findAll();
            return response.status(StatusCodes.OK).json(objects);
        } catch (error) {
            console.log(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }

    }
    async find(request: Request, response: Response): Promise<Response> {
        try {
            const objects: T[] = await this.genericServiceImpl.find(parseInt(request.params.pageNo), parseInt(request.params.limit));
            return response.status(StatusCodes.OK).json(objects);
        } catch (error) {
            console.log(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }

    }
    async findById(request: Request, response: Response): Promise<Response> {
        try {
            const data: T | undefined = await this.genericServiceImpl.findById(parseInt(request.params.id));
            if (data === undefined) {
                return response.status(StatusCodes.NOT_FOUND).json({ [ResponseKey.MESSAGE]: ResponseMessage.ENTITY_NOT_FOUND });
            }
            else {
                return response.status(StatusCodes.OK).json(data);
            }
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
        }
    }
    
}