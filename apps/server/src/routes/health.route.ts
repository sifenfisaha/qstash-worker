import { Router } from "express";

const router = Router();

router.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "@repo/server",
    timestamp: new Date().toISOString(),
  });
});

export default router;
