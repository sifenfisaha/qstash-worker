import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { logger } from "./utils/logger";
import AppRoutes from "./routes/index";

dotenv.config();

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]", {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  }),
);

app.use("/v1/api", AppRoutes);

export default app;
