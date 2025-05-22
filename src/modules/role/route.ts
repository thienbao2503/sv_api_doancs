import { IRoute } from "@core/interfaces";
import { Router } from "express";
import { AuthMiddleware, errorMiddleware } from "@core/middleware";
import Controller from "./controller";
import { CreateDto } from "./dtos/create.dto";
// import { RegisterDto } from "./dtos/create.dto";
// import { LoginDto } from "./dtos/login.dto";

export default class Route implements IRoute {
    public path = '/roles';
    public router = Router();

    public controller = new Controller();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.put(this.path + '/config/:id', AuthMiddleware.authorization(), this.controller.updateConfig);
        this.router.post(this.path + '/', errorMiddleware(CreateDto, 'body'), AuthMiddleware.authorization(), this.controller.create);
        this.router.get(this.path + '/', AuthMiddleware.authorization(), this.controller.search);
        this.router.patch(this.path + '/:id', AuthMiddleware.authorization(), this.controller.update);
        this.router.delete(this.path + '/:id', AuthMiddleware.authorization(), this.controller.delete);
    }
}
