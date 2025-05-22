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
    public update = async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        const model = req.body;
        try {
            const result = await this.service.update(id, model);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        try {
            const result = await this.service.delete(id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.DELETE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }

    public updateConfig = async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        const value = req.body.value;
        try {
            const result = await this.service.updateConfig(id, value);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }


}