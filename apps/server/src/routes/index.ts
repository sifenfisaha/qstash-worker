import { Router } from "express";
import HealthRoutes from "./health.route";
import EmailRoutes from "./email.route";
import ScheduleRoutes from "./schedule.route";
import RecurringHealthRoutes from "./recurring-health.route";

const router = Router();

router.use("/health", HealthRoutes);
router.use("/", EmailRoutes);
router.use("/", ScheduleRoutes);
router.use("/", RecurringHealthRoutes);

export default router;
