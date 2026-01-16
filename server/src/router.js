import { Router } from "express";
import authController from "./controllers/authController.js";
import rateController from "./controllers/rateController.js";

const router = Router();

router.use('/auth', authController);
router.use('/rate', rateController);

export default router