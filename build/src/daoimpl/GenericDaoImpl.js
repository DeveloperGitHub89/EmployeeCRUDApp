"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericDaoImpl = void 0;
const inversify_1 = require("inversify");
let GenericDaoImpl = class GenericDaoImpl {
    constructor(tableName, db) {
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
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objects = yield this.db(this.tableName).select();
                return objects;
            }
            catch (error) {
                throw error;
            }
        });
    }
    find(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.db(this.tableName).select().limit(limit).offset(offset);
                return employees;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const object = yield this.db(this.tableName).where(this.tableName + '.id', id).first();
                return object;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedRows = yield this.db(this.tableName).where(this.tableName + '.id', id).delete();
                return deletedRows;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GenericDaoImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()), __param(1, inversify_1.unmanaged())
], GenericDaoImpl);
exports.GenericDaoImpl = GenericDaoImpl;
