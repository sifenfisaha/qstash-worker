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

    console.log("Sending Email!");
    console.log(to, subject, text);

    return res.json({ sucess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed" });
  }
};
