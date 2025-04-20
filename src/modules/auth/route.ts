import { IRoute } from "@core/interfaces";
import { Router } from "express";
import { errorMiddleware } from "@core/middleware";
import Controller from "./controller";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";

export default class Route implements IRoute {
    public path = '/auth';
    public router = Router();

    public controller = new Controller();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path + '/register', errorMiddleware(RegisterDto, 'body'), this.controller.register);
        this.router.post(this.path + '/login', errorMiddleware(LoginDto, 'body'), this.controller.login);
    }
}
