import { Router } from "express";
import { heatlthCheck } from "../controller/health.controller";

const router = Router();

router.get("/", heatlthCheck);
router.post("/", heatlthCheck);

export default router;
