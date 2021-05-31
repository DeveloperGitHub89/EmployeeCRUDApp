"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.GenericServiceImpl = void 0;
const inversify_1 = require("inversify");
let GenericServiceImpl = class GenericServiceImpl {
    constructor(genericDaoImpl) {
        this.genericDaoImpl = genericDaoImpl;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objects = yield this.genericDaoImpl.findAll();
                return objects;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 07324 350035
    find(pageNo, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offset = (pageNo - 1) * limit;
                const employees = yield this.genericDaoImpl.find(limit, offset);
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
                const object = yield this.genericDaoImpl.findById(id);
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
                return yield this.genericDaoImpl.deleteById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GenericServiceImpl = __decorate([
    inversify_1.injectable()
], GenericServiceImpl);
exports.GenericServiceImpl = GenericServiceImpl;
