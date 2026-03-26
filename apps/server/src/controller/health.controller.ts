import type { Request, Response } from "express";

export const heatlthCheck = (_req: Request, res: Response) => {
  console.log(`[${new Date().toISOString()}] server is live`);

  res.json({
    status: "ok",
    service: "@repo/server",
    timestamp: new Date().toISOString(),
  });
};
