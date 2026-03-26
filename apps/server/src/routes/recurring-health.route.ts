import { Router } from "express";
import {
  createRecurringHealthScheduleHandler,
  deleteRecurringHealthScheduleHandler,
} from "../controller/recurring-health.controller";

const router = Router();

router.post("/recurring-health", createRecurringHealthScheduleHandler);
router.delete(
  "/recurring-health/:scheduleId",
  deleteRecurringHealthScheduleHandler,
);

export default router;
