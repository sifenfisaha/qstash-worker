import { Router } from "express";
import HealthRoutes from "./health.route";
import EmailRoutes from "./email.route";
import ScheduleRoutes from "./schedule.route";

const router = Router();

router.use("/health", HealthRoutes);
router.use("/", EmailRoutes);
router.use("/", ScheduleRoutes);

export default router;
