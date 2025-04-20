import { IRoute } from "@core/interfaces";
import { Router } from "express";
import { AuthMiddleware, errorMiddleware } from "@core/middleware";
import Controller from "./controller";
import { CreateProjectDto } from "./dtos/create.dto";
import { UpdateProjectDto } from "./dtos/update.dto";

export default class Route implements IRoute {
    public path = '/projects';
    public router = Router();

    public controller = new Controller();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path + '/', errorMiddleware(CreateProjectDto, 'body'), AuthMiddleware.authorization(), this.controller.create);
        this.router.patch(this.path + '/:id', errorMiddleware(UpdateProjectDto, 'body'), AuthMiddleware.authorization(), this.controller.update);
        this.router.get(this.path + '/', AuthMiddleware.authorization(), this.controller.search);
    }
}
