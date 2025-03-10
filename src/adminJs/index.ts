import AdminJS from "adminjs";
import AdminJsExpress from "@adminjs/express"
import AdminJsSequelize from "@adminjs/sequelize"
import {database} from "../database"
import { adminJsResources } from "./resources";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";

AdminJS.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJS({
    databases: [database],
    rootPath: "/admin",
    resources: adminJsResources,
    branding: brandingOptions,
    dashboard: dashboardOptions
})

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(adminJs, authenticationOptions, null, {
  resave: false,
  saveUninitialized: false
})