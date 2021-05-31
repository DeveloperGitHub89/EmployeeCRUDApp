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
exports.DepartmentDaoImpl = void 0;
const database_1 = require("../config/database");
const inversify_1 = require("inversify");
const GenericDaoImpl_1 = require("./GenericDaoImpl");
const DepartmentObjectDefinition_1 = require("./definition_objects/DepartmentObjectDefinition");
const TableName_1 = require("../constants/TableName");
const NesthydrationJs = require('nesthydrationjs')();
let DepartmentDaoImpl = class DepartmentDaoImpl extends GenericDaoImpl_1.GenericDaoImpl {
    constructor() {
        super(TableName_1.TableName.DEPARTMENTS, database_1.db);
    }
    save(department) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield database_1.db(TableName_1.TableName.DEPARTMENTS).insert(department);
                return id;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByIdWithEmployees(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const department = yield database_1.db(TableName_1.TableName.DEPARTMENTS)
                    .innerJoin(TableName_1.TableName.EMPLOYEES, TableName_1.TableName.DEPARTMENTS + '.id', TableName_1.TableName.EMPLOYEES + '.department_id')
                    .innerJoin(TableName_1.TableName.EMPLOYEE_ADDRESSES, TableName_1.TableName.EMPLOYEES + '.id', TableName_1.TableName.EMPLOYEE_ADDRESSES + '.employee_id')
                    .select(TableName_1.TableName.DEPARTMENTS + '.id as id', 'name', 'description', 'location', 'employees.id as employee_id', 'fname', 'lname', 'phone', 'dob', 'salary', 'address', 'type')
                    .where(TableName_1.TableName.DEPARTMENTS + '.id', id);
                const result = NesthydrationJs.nest(department, DepartmentObjectDefinition_1.definition);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
DepartmentDaoImpl = __decorate([
    inversify_1.injectable()
], DepartmentDaoImpl);
exports.DepartmentDaoImpl = DepartmentDaoImpl;
