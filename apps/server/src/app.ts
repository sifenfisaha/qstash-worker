import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { logger } from "./utils/logger";
import AppRoutes from "./routes/index";

dotenv.config();

const PORT = process.env.PORT || 4000;
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

app.get("/", (req, res) => {
  res.json({ test: "test" });
});

app.use("/api", AppRoutes);

app.listen(PORT, () => {
  logger.info("Express server listening on http://localhost:%d", PORT);
});

export default app;
