import { Router } from "express";
import { scheduleHandler } from "../controller/schedule.controller";

const router = Router();

router.post("/schedule", scheduleHandler);

export default router;
