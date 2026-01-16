import { Router } from "express";
import authController from "./controllers/authController.js";
import rateController from "./controllers/rateController.js";
import priceController from "./controllers/priceController.js";

const router = Router();

router.use('/auth', authController);
router.use('/rate', rateController);
router.use('/products', priceController)

export default router