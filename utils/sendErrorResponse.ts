import { Response } from "express"

export function sendErrorResponse(res:Response, statusCode:number, message:string){
    return res.status(statusCode).send(message)
}