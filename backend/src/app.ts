import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./api/users/user.routes";

dotenv.config();

const app: Express = express();

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to this API" });
});

app.use("/users", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : "🥞",
  });
});

export default app;
