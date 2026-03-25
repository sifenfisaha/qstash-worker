import { Router } from "express";
import { heatlthCheck } from "../controller/health.controller";

const router = Router();

router.get("/", heatlthCheck);

export default router;
