import { ExcludedPaths } from "../utility/authorization";
import { Route, Routes } from "./routes.types";
import { AuthRouter } from '../auth/auth.routes';

export const routes: Routes = [new Route("/auth", AuthRouter)];

export const excludedPaths: ExcludedPaths[] = [
  { path: "/auth/login", method: "POST" },
];
