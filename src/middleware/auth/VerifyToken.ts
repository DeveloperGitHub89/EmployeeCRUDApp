import { verify,decode } from "jsonwebtoken";
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { ResponseKey } from "../../constants/ResponseKey";
import { ResponseMessage } from "../../constants/ResponseMessage";
import * as dotenv from 'dotenv';
dotenv.config();

export function verifyToken(roles: string[]) {
    return (request: Request, response: Response, next: any) => {
        let token: any = request.get('authorization');
        if (token != undefined) {
            token = token.slice(7);
            verify(token, <string>process.env.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
                if (err) {
                    return response.status(StatusCodes.UNAUTHORIZED).json({ [ResponseKey.MESSAGE]: ResponseMessage.INVALID_TOKEN });
                }
                else {
                    const decodedToken: any = decode(token, { complete: true });
                    let flag:number=0;
                    roles.forEach(role=>{
                        if (decodedToken.payload.role === role) {
                            flag=1;
                        }
                    });
                    if(flag===1){
                       next();
                    }
                    else {
                        return response.status(StatusCodes.UNAUTHORIZED).json({ [ResponseKey.MESSAGE]: ResponseMessage.INVALID_TOKEN });
                    }
                }
            });
        }
        else {
            return response.status(StatusCodes.UNAUTHORIZED).json({ [ResponseKey.MESSAGE]: ResponseMessage.ACCESS_DENIED });
        }
    }
}