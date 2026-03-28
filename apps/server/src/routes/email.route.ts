import { Router } from "express";
import { sendEmailHandler } from "../controller/email.controller.js";

const router = Router();

router.post("/send-email", sendEmailHandler);

export default router;
