import { IRoute } from "@core/interfaces";
import { Router } from "express";
import { AuthMiddleware, errorMiddleware } from "@core/middleware";
import Controller from "./controller";
import { AddUserDto } from "./dtos/addUser.dto";
import { UpdateRoleDto } from "./dtos/updateRole.dto";
import { DeleteUserDto } from "./dtos/deleteUser.dto";

export default class Route implements IRoute {
    public path = '/teams';
    public router = Router();

    public controller = new Controller();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path + '/', AuthMiddleware.authorization(), this.controller.search);
        this.router.post(this.path + '/', AuthMiddleware.authorization(), errorMiddleware(AddUserDto, 'body'), this.controller.create);
        this.router.put(this.path + '/:id', AuthMiddleware.authorization(), errorMiddleware(UpdateRoleDto, 'body'), this.controller.update);
        this.router.delete(this.path + '/:id', AuthMiddleware.authorization(), errorMiddleware(DeleteUserDto, 'body'), this.controller.delete);
    }
}
