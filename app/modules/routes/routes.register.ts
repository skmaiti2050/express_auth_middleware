import { Application, json, NextFunction, Request, Response } from "express";
import { authorize } from "../utility/authorization";
import { ResponseHandler } from "../utility/response-handler";
import { excludedPaths, routes } from "./routes.data";

export const registerRoutes = (app: Application) => {
  app.use(json());
  app.use(authorize(excludedPaths));
  for (let route of routes) {
    app.use(route.path, route.router);
  }
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
