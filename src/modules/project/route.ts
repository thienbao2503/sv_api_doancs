import { IRoute } from "@core/interfaces";
import { Router } from "express";
import { AuthMiddleware, errorMiddleware } from "@core/middleware";
import Controller from "./controller";
import { CreateProjectDto } from "./dtos/create.dto";
import { UpdateProjectDto } from "./dtos/update.dto";
import { AddUserDto } from "./dtos/addUser.dto";
import { UpdateRoleDto } from "./dtos/updateRole.dto";
import { DeleteUserDto } from "./dtos/deleteUser.dto";

export default class Route implements IRoute {
    public path = '/projects';
    public router = Router();

    public controller = new Controller();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path + '/team', AuthMiddleware.authorization(), this.controller.getTeam);
        this.router.post(this.path + '/team/add-user/:id', errorMiddleware(AddUserDto, 'body'), AuthMiddleware.authorization(), this.controller.addUser);
        this.router.put(this.path + '/team/update-role/:id', errorMiddleware(UpdateRoleDto, 'body'), AuthMiddleware.authorization(), this.controller.updateRole);
        this.router.delete(this.path + '/team/:id', errorMiddleware(DeleteUserDto, 'body'), AuthMiddleware.authorization(), this.controller.deleteUser);
        this.router.post(this.path + '/', errorMiddleware(CreateProjectDto, 'body'), AuthMiddleware.authorization(), this.controller.create);
        this.router.get(this.path + '/:id', AuthMiddleware.authorization(), this.controller.getById);
        this.router.patch(this.path + '/:id', errorMiddleware(UpdateProjectDto, 'body'), AuthMiddleware.authorization(), this.controller.update);
        this.router.delete(this.path + '/:id', AuthMiddleware.authorization(), this.controller.delete);
        this.router.get(this.path + '/', AuthMiddleware.authorization(), this.controller.search);

    }
}
