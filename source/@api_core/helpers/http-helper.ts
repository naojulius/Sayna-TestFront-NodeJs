import { Request, Response } from "express";
export class HttpHelper {
    static OK_TOKEN = async (req: Request, res: Response, message?: any, tokens?: Object) => {
        return res.status(200).send({error: false, message: message, tokens: tokens});
    };
    static OK = async (req: Request, res: Response, message?: any, data?: Object) => {
        return message 
        ? res.status(200).send({error: false, message: message})
        : res.status(200).send({error: false, data!:data});
    };
    static ACCEPTED = async (req: Request, res: Response, message: any) => {
        return  res.status(201).send({error: false, message: message});
    };
    static UNAUTHORIZED = async (req: Request, res: Response, message: any) => {
        return  res.status(401).send({error: true, message: message});
    };
    static BAD_REQUEST = async (req: Request, res: Response, message: any) => {
        return  res.status(400).send({error: true, message: message});
    };
    static NOT_FOUND = async (req: Request, res: Response, message: any) => {
        return  res.status(404).send({error: true, message: message});
    };

}
