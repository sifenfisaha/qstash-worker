import { Client } from "@upstash/qstash";
import dotenv from "dotenv";

dotenv.config();

export const qstashClient = new Client({
  baseUrl: "https://qstash-eu-central-1.upstash.io",
  token: process.env.QSTASH_TOKEN!,
});
