import type { Request, Response } from "express";
import { qstashClient } from "../lib/qstash";

const HEALTH_CRON_EXPRESSION = "*/10 * * * *";

export const createRecurringHealthScheduleHandler = async (
  _req: Request,
  res: Response,
) => {
  try {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
      return res.status(500).json({ error: "BASE_URL is not configured" });
    }

    const schedule = await qstashClient.schedules.create({
      destination: `${baseUrl}/api/health`,
      cron: HEALTH_CRON_EXPRESSION,
      body: JSON.stringify({ source: "qstash-recurring-health" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status(201).json({
      message: "Recurring health check schedule created",
      scheduleId: schedule.scheduleId,
      cron: HEALTH_CRON_EXPRESSION,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create recurring health schedule" });
  }
};

export const deleteRecurringHealthScheduleHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const scheduleIdParam = req.params.scheduleId;
    const scheduleId = Array.isArray(scheduleIdParam)
      ? scheduleIdParam[0]
      : scheduleIdParam;

    if (!scheduleId) {
      return res.status(400).json({ error: "scheduleId is required" });
    }

    await qstashClient.schedules.delete(scheduleId);

    return res.json({
      message: "Recurring health check schedule deleted",
      scheduleId,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete recurring health schedule" });
  }
};
