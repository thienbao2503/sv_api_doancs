require('module-alias/register');
require('dotenv').config();
import { AuthRoute } from "@modules/auth";
import App from "./app"
import IndexRoute from "./modules/index/index.route"
import 'reflect-metadata';
import { RolesRoute } from "@modules/role";


const routes = [
    new IndexRoute(),
    new AuthRoute(),
    new RolesRoute()
];
const app = new App(routes);

app.listen();