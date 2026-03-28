import type { Request, Response } from "express";
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

export const sendEmailHandler = async (req: Request, res: Response) => {
  try {
    const signature = req.header("upstash-signature") as string;

    const isValid = await receiver.verify({
      signature,
      body: JSON.stringify(req.body),
    });

    if (!isValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const { to, subject, text } = req.body;

    req.blypLog?.info("Sending email", { to, subject });

    return res.json({ sucess: true });
  } catch (error) {
    req.blypLog?.error("Failed to send email", {
      error: error instanceof Error ? error.message : error,
    });
    return res.status(500).json({ error: "Failed" });
  }
};
