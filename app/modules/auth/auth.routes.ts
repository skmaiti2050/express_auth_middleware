import { Request, Response, NextFunction, Router } from "express";
import { ResponseHandler } from "../utility/response-handler";
import authService from "./auth.service";
export const AuthRouter = Router();

AuthRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = authService.login(req.body);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});
