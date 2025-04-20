import { NextFunction, Request, Response } from "express";
import Services from "./service";
import { sendResponse } from "@core/utils";
import messages from "@core/config/constants";

export default class Controller {
    public service = new Services();
    public register = async (req: Request, res: Response, next: NextFunction) => {
        const model = req.body;
        try {
            const result = await this.service.register(model);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.REGISTER_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public login = async (req: Request, res: Response, next: NextFunction) => {
        const model = req.body;
        try {
            const result = await this.service.login(model);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.LOGIN_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }

}