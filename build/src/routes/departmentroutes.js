"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DepartmentController_1 = require("../controllers/DepartmentController");
const express_1 = require("express");
const inversify_config_1 = __importDefault(require("../config/inversify.config"));
const departmentRouter = express_1.Router();
const departmentController = inversify_config_1.default.resolve(DepartmentController_1.DepartmentController);
departmentRouter.get('/', departmentController.findAll);
departmentRouter.get('/:id', departmentController.findById);
departmentRouter.get('/:id/employees', departmentController.findByIdWithEmployees);
departmentRouter.get('/page/:pageNo/limit/:limit', departmentController.find);
departmentRouter.post('/', departmentController.save);
departmentRouter.delete('/:id', departmentController.deleteById);
exports.default = departmentRouter;
