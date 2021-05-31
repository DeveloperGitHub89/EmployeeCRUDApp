"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const EmployeeDaoImpl_1 = require("../daoimpl/EmployeeDaoImpl");
const EmployeeServiceImpl_1 = require("../serviceimpl/EmployeeServiceImpl");
const DepartmentDaoImpl_1 = require("../daoimpl/DepartmentDaoImpl");
const DepartmentServiceImpl_1 = require("../serviceimpl/DepartmentServiceImpl");
const symbols_1 = __importDefault(require("../types/DependencyInjectorSymbols/symbols"));
const container = new inversify_1.Container();
container.bind(symbols_1.default.EmployeeServiceImpl).to(EmployeeServiceImpl_1.EmployeeServiceImpl).inSingletonScope();
container.bind(symbols_1.default.EmployeeDaoImpl).to(EmployeeDaoImpl_1.EmployeeDaoImpl).inSingletonScope();
container.bind(symbols_1.default.DepartmentServiceImpl).to(DepartmentServiceImpl_1.DepartmentServiceImpl).inSingletonScope();
container.bind(symbols_1.default.DepartmentDaoImpl).to(DepartmentDaoImpl_1.DepartmentDaoImpl).inSingletonScope();
exports.default = container;
