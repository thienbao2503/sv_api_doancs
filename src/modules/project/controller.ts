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
    // get by id
    public getById = async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        try {
            const result = await this.service.getById(id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.FIND_ALL_SUCCESS, result);
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
    public addUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email, role_id } = req.body;
        const project_id = Number(req.params.id);

        try {
            const result = await this.service.addTeam(project_id, email, role_id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.CREATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public updateRole = async (req: Request, res: Response, next: NextFunction) => {
        const { user_id, role_id } = req.body;
        const project_id = Number(req.params.id);
        try {
            const result = await this.service.updateRole(project_id, user_id, role_id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { user_id } = req.body;
        const project_id = Number(req.params.id);
        try {
            const result = await this.service.deleteUser(project_id, user_id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.DELETE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }

    public getTeam = async (req: Request, res: Response, next: NextFunction) => {
        const { project_id } = req.query;
        const productID = project_id ? Number(project_id) : undefined
        const user_id = req.id as number;
        try {
            const result = await this.service.getTeam(user_id, productID);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.FIND_ALL_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
}