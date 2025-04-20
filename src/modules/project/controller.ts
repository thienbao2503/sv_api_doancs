import { NextFunction, Request, Response } from "express";
import Services from "./service";
import { sendResponse } from "@core/utils";
import messages from "@core/config/constants";

export default class Controller {
    public service = new Services();
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const model = req.body;
        const user_id = req.id as number;
        try {
            const result = await this.service.create(model, user_id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.CREATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {
        const model = req.body;
        const id = Number(req.params.id);
        try {
            const result = await this.service.update(model, id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public search = async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query;
        const user_id = req.id as number;
        try {
            const result = await this.service.search(query, user_id);
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