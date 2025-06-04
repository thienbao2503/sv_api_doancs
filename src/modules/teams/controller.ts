import { NextFunction, Request, Response } from "express";
import Services from "./service";
import { sendResponse } from "@core/utils";
import messages from "@core/config/constants";

export default class Controller {
    public service = new Services();
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const { email, role_id } = req.body;
        const created_id = Number(req.id);

        try {
            const result = await this.service.create(email, role_id, created_id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.CREATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {
        const { role_id } = req.body;
        const id = Number(req.params.id);
        try {
            const result = await this.service.update(role_id, id);
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

    public search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const created_id = Number(req.id);
            const query = req.query as { page?: number, limit?: number, search?: string, role_id?: number };

            const result = await this.service.search(created_id, query);

            if (result instanceof Error) {
                return sendResponse(res, result.status, result.message, null, result.field);
            }

            return sendResponse(res, 200, messages.FIND_ALL_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
}