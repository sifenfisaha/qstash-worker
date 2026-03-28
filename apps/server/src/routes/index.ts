import { Router } from "express";
import HealthRoutes from "./health.route.js";
import EmailRoutes from "./email.route.js";
import ScheduleRoutes from "./schedule.route.js";
import RecurringHealthRoutes from "./recurring-health.route.js";

const router = Router();

router.use("/health", HealthRoutes);
router.use("/", EmailRoutes);
router.use("/", ScheduleRoutes);
router.use("/", RecurringHealthRoutes);

export default router;
