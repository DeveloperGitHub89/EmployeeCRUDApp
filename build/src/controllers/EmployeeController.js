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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const http_status_codes_1 = require("http-status-codes");
const inversify_1 = require("inversify");
const ResponseKey_1 = require("../constants/ResponseKey");
const ResponseMessage_1 = require("../constants/ResponseMessage");
const symbols_1 = __importDefault(require("../types/DependencyInjectorSymbols/symbols"));
let EmployeeController = class EmployeeController {
    constructor(employeeServiceImpl) {
        this.employeeServiceImpl = employeeServiceImpl;
        this.find = this.find.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findNames = this.findNames.bind(this);
        this.findById = this.findById.bind(this);
        this.findByNameStartsWith = this.findByNameStartsWith.bind(this);
        this.save = this.save.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.findByDepartment = this.findByDepartment.bind(this);
        this.findByIdWithDepartment = this.findByIdWithDepartment.bind(this);
    }
    save(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield this.employeeServiceImpl.save(request.body, parseInt(request.params.departmentId));
                return response.status(http_status_codes_1.StatusCodes.CREATED).json({ [ResponseKey_1.ResponseKey.MESSAGE]: ResponseMessage_1.ResponseMessage.ENTITY_CREATED + " with id " + id });
            }
            catch (error) {
                console.log(error);
                if (error.errno === 1062) {
                    return response.status(http_status_codes_1.StatusCodes.CONFLICT).json({ [ResponseKey_1.ResponseKey.MESSAGE]: ResponseMessage_1.ResponseMessage.DUPLICATE_ENTITY });
                }
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error });
            }
        });
    }
    deleteById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedRows = yield this.employeeServiceImpl.deleteById(parseInt(request.params.id));
                if (deletedRows > 0) {
                    return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json();
                }
                else {
                    return response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ [ResponseKey_1.ResponseKey.MESSAGE]: ResponseMessage_1.ResponseMessage.ENTITY_NOT_FOUND });
                }
            }
            catch (error) {
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error });
            }
        });
    }
    findAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeServiceImpl.findAll();
                return response.status(http_status_codes_1.StatusCodes.OK).json(employees);
            }
            catch (error) {
                console.log(error);
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error.message });
            }
        });
    }
    find(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeServiceImpl.find(parseInt(request.params.pageNo), parseInt(request.params.limit));
                return response.status(http_status_codes_1.StatusCodes.OK).json(employees);
            }
            catch (error) {
                console.log(error);
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error.message });
            }
        });
    }
    findNames(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeServiceImpl.findNames(parseInt(request.params.id));
                return response.status(http_status_codes_1.StatusCodes.OK).json(data);
                ;
            }
            catch (error) {
                console.log(error);
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error.message });
            }
        });
    }
    findById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeServiceImpl.findById(parseInt(request.params.id));
                if (data === undefined) {
                    return response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ [ResponseKey_1.ResponseKey.MESSAGE]: ResponseMessage_1.ResponseMessage.ENTITY_NOT_FOUND });
                }
                else {
                    return response.status(http_status_codes_1.StatusCodes.OK).json(data);
                }
            }
            catch (error) {
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error.message });
            }
        });
    }
    findByDepartment(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeServiceImpl.findByDepartment(parseInt(request.params.id));
                return response.status(http_status_codes_1.StatusCodes.OK).json(employees);
            }
            catch (error) {
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error.message });
            }
        });
    }
    findByNameStartsWith(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeServiceImpl.findByNameStartsWith(request.params.name);
                return response.status(http_status_codes_1.StatusCodes.OK).json(employees);
            }
            catch (error) {
                if (error instanceof TypeError) {
                    return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error.message });
                }
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            }
        });
    }
    findByIdWithDepartment(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeServiceImpl.findByIdWithDepartment(parseInt(request.params.id));
                return response.status(http_status_codes_1.StatusCodes.OK).json(employee);
            }
            catch (error) {
                return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey_1.ResponseKey.ERROR]: error.message });
            }
        });
    }
};
EmployeeController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(symbols_1.default.EmployeeServiceImpl))
], EmployeeController);
exports.EmployeeController = EmployeeController;
