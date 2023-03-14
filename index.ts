import express from "express";
import { config } from "dotenv";
import { registerRoutes } from "./app/modules/routes/routes.register";
config();

export const server = () => {
  const app = express();
  const { PORT } = process.env;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  registerRoutes(app);
};

server();
