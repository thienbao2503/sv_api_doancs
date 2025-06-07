import { IRoute } from "@core/interfaces";
import { Router } from "express";
import { AuthMiddleware, errorMiddleware } from "@core/middleware";
import Controller from "./controller";
import { CreateDto } from "./dtos/create.dto";
import { PERMISSION_TYPE } from "@core/config/constants";
import { UploadImage } from "@core/utils/upload.image";
import multer from 'multer';
// import { RegisterDto } from "./dtos/create.dto";
// import { LoginDto } from "./dtos/login.dto";

export default class Route implements IRoute {
    public path = '/task';
    public router = Router();

    public controller = new Controller();

    // Configure multer
    // ⚙️ Cấu hình multer: dùng memoryStorage (nếu xử lý ảnh sau đó), hoặc diskStorage nếu lưu file
    private upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB mỗi file
            files: 10,                 // tối đa 10 file
        }
    });


    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(this.path + '/', AuthMiddleware.authorization(), AuthMiddleware.checkRole(PERMISSION_TYPE.CREATE), errorMiddleware(CreateDto, 'body'), this.controller.create);
        this.router.get(this.path + '/', AuthMiddleware.authorization(), this.controller.search);
        this.router.patch(this.path + '/:id', AuthMiddleware.authorization(), AuthMiddleware.checkRole(PERMISSION_TYPE.UPDATE_INFO), AuthMiddleware.checkRole(PERMISSION_TYPE.UPDATE_INFO), this.controller.update);
        this.router.post(this.path + '/assign/:id', AuthMiddleware.authorization(), AuthMiddleware.checkRole(PERMISSION_TYPE.ASSIGN), this.controller.assignTask);
        this.router.patch(this.path + '/update-progress/:id', AuthMiddleware.authorization(), AuthMiddleware.checkRole(PERMISSION_TYPE.UPDATE_PROGRESS), this.controller.updateContractorProgress);
        this.router.patch(this.path + '/confirm-result/:id', AuthMiddleware.authorization(), AuthMiddleware.checkRole(PERMISSION_TYPE.CONFIRM_RESULT), this.controller.updateSupervisorProgress);
        this.router.delete(this.path + '/delete-image', AuthMiddleware.authorization(), AuthMiddleware.checkRole(PERMISSION_TYPE.UPDATE_INFO), this.controller.deleteImage);
        this.router.delete(this.path + '/:id', AuthMiddleware.authorization(), AuthMiddleware.checkRole(PERMISSION_TYPE.UPDATE_INFO), this.controller.delete);
        // upload imag
        // this.router.post(this.path + '/upload-image/:id', AuthMiddleware.authorization(), this.upload.array('images', 10), this.controller.uploadImages);

        this.router.post(
            this.path + '/upload-images/:id',
            AuthMiddleware.authorization(),
            AuthMiddleware.checkRole(PERMISSION_TYPE.UPDATE_INFO),
            this.upload.array('images', 10), // 👈 Khớp với formData.append('images', ...)
            this.controller.uploadImages
        );

        // deleteImage
    }
}
