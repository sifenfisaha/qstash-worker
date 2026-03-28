import { Router } from "express";
import { scheduleHandler } from "../controller/schedule.controller.js";

const router = Router();

router.post("/schedule", scheduleHandler);

export default router;
