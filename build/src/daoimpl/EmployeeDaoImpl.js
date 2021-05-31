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
exports.EmployeeDaoImpl = void 0;
const database_1 = require("../config/database");
const inversify_1 = require("inversify");
const GenericDaoImpl_1 = require("./GenericDaoImpl");
const EmployeeObjectDefinition_1 = require("./definition_objects/EmployeeObjectDefinition");
const TableName_1 = require("../constants/TableName");
const NesthydrationJs = require('nesthydrationjs')();
let EmployeeDaoImpl = class EmployeeDaoImpl extends GenericDaoImpl_1.GenericDaoImpl {
    constructor() {
        super(TableName_1.TableName.EMPLOYEES, database_1.db);
    }
    /* overriding save method from GenericDao */
    save(employeeRequestObject, departmentId, txn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addresses = employeeRequestObject.addresses;
                delete employeeRequestObject['addresses'];
                employeeRequestObject.department_id = departmentId;
                const id = yield txn(TableName_1.TableName.EMPLOYEES).insert(employeeRequestObject);
                addresses.forEach((address) => address.employee_id = id);
                yield txn(TableName_1.TableName.EMPLOYEE_ADDRESSES).insert(addresses);
                //txn.commit();
                return id;
            }
            catch (error) {
                // txn.rollback();
                throw error;
            }
        });
    }
    findNames(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield database_1.db(TableName_1.TableName.EMPLOYEES).where({ id: id }).select('fname').select('lname');
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findbyDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield database_1.db(TableName_1.TableName.EMPLOYEES).where({ department_id: id });
                return employees;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByNameStartsWith(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pattern = name + '%';
                const employees = yield database_1.db(TableName_1.TableName.EMPLOYEES).where('fname', 'like', pattern).select();
                return employees;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByIdWithDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield database_1.db(TableName_1.TableName.EMPLOYEES)
                    .innerJoin(TableName_1.TableName.DEPARTMENTS, TableName_1.TableName.EMPLOYEES + '.department_id', 'departments.id')
                    .innerJoin(TableName_1.TableName.EMPLOYEE_ADDRESSES, TableName_1.TableName.EMPLOYEES + '.id', TableName_1.TableName.EMPLOYEE_ADDRESSES + '.employee_id')
                    .select(TableName_1.TableName.EMPLOYEES + '.id as id', 'fname', 'lname', 'phone', 'dob', 'salary', TableName_1.TableName.DEPARTMENTS + '.id as department_id', 'name', 'description', 'location', 'address', 'type')
                    .where(TableName_1.TableName.EMPLOYEES + '.id', id);
                const result = NesthydrationJs.nest(employee, EmployeeObjectDefinition_1.definition);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
EmployeeDaoImpl = __decorate([
    inversify_1.injectable()
], EmployeeDaoImpl);
exports.EmployeeDaoImpl = EmployeeDaoImpl;
