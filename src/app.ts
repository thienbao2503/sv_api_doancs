import { IRoute } from "@core/interfaces";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import errorMiddleware from "@core/middleware/error.middleware";
import Logger from "@core/utils/logger";
import path from "path";
const multer = require('multer');
import database from "@core/config/database";

class App {
    public app: express.Application
    public port: number | string
    public environment: string

    constructor(routes: IRoute[]) {
        this.environment = this.envConfig();
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.connectMySql();
        this.initialMiddlewares()
        this.initialRoutes(routes)
        this.initialErrorMidlleware()
    }
    private async initialRoutes(routes: IRoute[]) {
        routes.forEach(route => {

            this.app.use(process.env.API_VERSION!, route.router)
        })
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
    private initialMiddlewares() {

        this.app.use(morgan('dev'))
        this.app.use(cors({ origin: true, credentials: true }))
        // const swaggerDocument = YAML.load(path.resolve('./src/core/swagger/yomart-swagger.yaml'));
        // const swaggerDocument = YAML.load(path.resolve('./yomart-swagger.yaml'));
        // this.app.use('/yomart/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use('/uploads', express.static(path.resolve('uploads/')));
    }
    private initialErrorMidlleware() {
        this.app.use(errorMiddleware);
        this.app.use(multer().single('file'));
    }
    private connectMySql() {
        database.connectDB();
    }
    private envConfig() {
        const env = process.env.NODE_ENV || 'development';
        require('dotenv').config({ path: path.resolve(`.env_${env}`) });
        return env;
    }
}

export default App;