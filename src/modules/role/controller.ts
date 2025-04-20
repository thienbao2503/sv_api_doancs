import { NextFunction, Request, Response } from "express";
import Services from "./service";
import { sendResponse } from "@core/utils";
import messages from "@core/config/constants";

export default class Controller {
    public service = new Services();
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const model = req.body;
        try {
            const result = await this.service.create(model);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.CREATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public search = async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query;
        try {
            const result = await this.service.search(query);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.FIND_ALL_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    // public login = async (req: Request, res: Response, next: NextFunction) => {
    //     const model = req.body;
    //     try {
    //         const result = await this.service.login(model);
    //         if (result instanceof Error)
    //             return sendResponse(res, result.status, result.message, null, result.field);
    //         return sendResponse(res, 200, messages.LOGIN_SUCCESS, result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

}