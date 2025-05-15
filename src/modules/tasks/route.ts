import { IRoute } from "@core/interfaces";
import { Router } from "express";
import { errorMiddleware } from "@core/middleware";
import Controller from "./controller";
import { CreateDto } from "./dtos/create.dto";
// import { RegisterDto } from "./dtos/create.dto";
// import { LoginDto } from "./dtos/login.dto";

export default class Route implements IRoute {
    public path = '/task';
    public router = Router();

    public controller = new Controller();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(this.path + '/', errorMiddleware(CreateDto, 'body'), this.controller.create);
        this.router.get(this.path + '/', this.controller.search);
        this.router.patch(this.path + '/:id', this.controller.update);
        this.router.delete(this.path + '/:id', this.controller.delete);
    }
}
