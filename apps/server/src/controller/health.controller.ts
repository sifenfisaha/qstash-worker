import type { Request, Response } from "express";

export const heatlthCheck = (req: Request, res: Response) => {
  req.blypLog?.info("server is live", {
    at: new Date().toISOString(),
  });

  res.json({
    status: "ok",
    service: "@repo/server",
    timestamp: new Date().toISOString(),
  });
};
