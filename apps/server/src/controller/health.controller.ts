import type { Request, Response } from "express";

export const heatlthCheck = (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "@repo/server",
    timestamp: new Date().toISOString(),
  });
};
