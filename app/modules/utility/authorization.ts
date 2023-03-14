import { Response, Request, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface ExcludedPaths {
  path: string;
  method: Method;
}

export const createToken = (payload: any) => {
  const { JWT_SECRET } = process.env;
  const token = sign(payload, JWT_SECRET || "", { expiresIn: "60s" });
  return token;
};

export const verifyToken = (token: string) => {
  const { JWT_SECRET } = process.env;
  const payload = verify(token, JWT_SECRET || "");
  return payload;
};

export const authorize = (excludedPaths: ExcludedPaths[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        excludedPaths.find((e) => e.path === req.url && e.method === req.method)
      ) {
        return next();
      }
      const token = req.headers.authorization || "";
      const payload = verifyToken(token);
      res.locals.user = payload;
      next();
    } catch (err) {
      next({ statusCode: 403, message: `Unauthorized: ${err}` });
    }
  };
};
