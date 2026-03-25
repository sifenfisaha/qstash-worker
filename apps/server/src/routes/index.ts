import { Router } from "express";
import HealthRoutes from "./health.route";

const router = Router();

router.use("/health", HealthRoutes);

export default router;
