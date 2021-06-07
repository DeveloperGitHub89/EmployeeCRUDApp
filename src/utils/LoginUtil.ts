import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import { AuthRole } from "../constants/AuthRole";
import { ResponseKey } from "../constants/ResponseKey";
import { ResponseMessage } from "../constants/ResponseMessage";

export async function login(serviceImpl: any, request: Request, response: Response,role:AuthRole){
    try {
        const isAuthenticated: boolean = await serviceImpl.authenticate(request.body.phone, request.body.password);
        if (isAuthenticated) {
            const token = sign({ phone: request.body.phone, role:role }, <string>process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 500
            });
            return response.status(StatusCodes.OK).json({ [ResponseKey.MESSAGE]: ResponseMessage.LOGIN_SUCCESS, [ResponseKey.AUTH_TOKEN]: token });
        }
        else {
            return response.status(StatusCodes.UNAUTHORIZED).json({ [ResponseKey.MESSAGE]: ResponseMessage.LOGIN_FAILED });
        }
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error.message });
    }
}