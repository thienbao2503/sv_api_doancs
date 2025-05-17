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

    public getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Lấy userId từ token hoặc params, ở đây giả sử lấy từ req.user.id (bạn cần middleware xác thực để gán user vào req)
            const userId = req?.id
            const result = await this.service.getUserById(Number(userId));
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }

    public updateProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.id
            const model = req.body;
            const result = await this.service.updateUser(Number(userId), model);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
}