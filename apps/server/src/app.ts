import cors from "cors";
import dotenv from "dotenv";
import express, { type ErrorRequestHandler } from "express";
import { createExpressErrorLogger, createLogger } from "@blyp/core/express";
import AppRoutes from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(createLogger({ pretty: false }));

app.get("/", (req, res) => {
  res.json({ test: "test" });
});

app.use("/api", AppRoutes);

app.use(createExpressErrorLogger());

const finalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    error: error instanceof Error ? error.message : "Internal Server Error",
  });
};

app.use(finalErrorHandler);

app.listen(PORT, () => {
  console.info("Express server listening on http://localhost:%d", PORT);
});

export default app;
