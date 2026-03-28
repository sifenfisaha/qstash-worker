import type { Request, Response } from "express";
import { qstashClient } from "../lib/qstash.js";

export const scheduleHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const baseUrl = process.env.BASE_URL;

    if (typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!baseUrl) {
      return res.status(500).json({ error: "BASE_URL is not configured" });
    }

    const meetingTime = new Date(Date.now() + 5 * 60 * 1000);

    await qstashClient.publishJSON({
      url: `${baseUrl}/api/send-email`,
      body: {
        to: email,
        subject: "Meeting scheduled",
        text: "Your meeting has been scheduled 5 minutes from now.",
      },
    });

    await qstashClient.publishJSON({
      url: `${baseUrl}/api/send-email`,
      body: {
        to: email,
        subject: "Meeting is live",
        text: "Join now!",
      },
      notBefore: Math.floor(meetingTime.getTime() / 1000),
    });

    return res.json({
      message: "Scheduled successfully",
      scheduledFor: meetingTime.toISOString(),
    });
  } catch (error) {
    req.blypLog?.error("Failed to schedule", {
      error: error instanceof Error ? error.message : error,
    });
    return res.status(500).json({ error: "Failed to schedule" });
  }
};
