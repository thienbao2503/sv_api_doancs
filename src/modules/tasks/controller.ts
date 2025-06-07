import { NextFunction, Request, Response } from "express";
import Services from "./service";
import { sendResponse } from "@core/utils";
import messages from "@core/config/constants";

export default class Controller {
    public service = new Services();
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const model = req.body;
        // const roleIDs = JSON.parse(req.body.roleIDs);
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
        const user_id = Number(req.id);
        try {
            const result = await this.service.search(query, user_id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.FIND_ALL_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {
        const model = req.body;
        const id = parseInt(req.params.id);
        try {
            const result = await this.service.update(id, model);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    //updateContractorProgress 
    public updateContractorProgress = async (req: Request, res: Response, next: NextFunction) => {
        const taskId = parseInt(req.params.id);
        const progress = parseInt(req.body.progress);
        try {
            const result = await this.service.updateContractorProgress(taskId, progress);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    // updateSupervisorProgress
    public updateSupervisorProgress = async (req: Request, res: Response, next: NextFunction) => {
        const taskId = parseInt(req.params.id);
        const progress = parseInt(req.body.progress);
        try {
            const result = await this.service.updateSupervisorProgress(taskId, progress);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public assignTask = async (req: Request, res: Response, next: NextFunction) => {
        const taskId = parseInt(req.params.id);
        const roleIDs = JSON.parse(req.body.roleIDs);
        try {
            const result = await this.service.assignTask(taskId, roleIDs);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.UPDATE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);
        try {
            const result = await this.service.delete(id);
            if (result instanceof Error)
                return sendResponse(res, result.status, result.message, null, result.field);
            return sendResponse(res, 200, messages.DELETE_SUCCESS, result);
        } catch (error) {
            next(error);
        }
    }

    public uploadImages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId = Number(req.params.id);
            const files = (req.files || []) as Express.Multer.File[];

            console.log('FILES:', req.files);

            if (files.length === 0) {
                return sendResponse(res, 400, 'Vui lòng chọn ít nhất 1 ảnh', null);
            }

            const result = await this.service.uploadImages(taskId, files);

            if (result instanceof Error) {
                return sendResponse(res, result.status, result.message, null);
            }

            return sendResponse(res, 200, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }

    public deleteImage = async (req: Request, res: Response, next: NextFunction) => {
        const {
            taskId,
            imageId
        } = req.body;

        try {
            console.log('Delete Image Request:', req.body);

            const result = await this.service.deleteImage(taskId, imageId);
            if (result instanceof Error) {
                return sendResponse(res, result.status, result.message, null);
            }
            return sendResponse(res, 200, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }

}