import { Router } from "express";
import authController from "./controllers/authController.js";
import rateController from "./controllers/rateController.js";
import priceController from "./controllers/priceController.js";
import categoriesController from "./controllers/categoriesController.js";
import productsController from "./controllers/productsController.js";
import basketController from "./controllers/basketController.js";
import settingsController from "./controllers/settingsController.js";
import complianceController from "./controllers/complianceController.js";
import analyticsController from "./controllers/analyticsController.js";

const router = Router();

router.use('/auth', authController);
router.use('/rate', rateController);
router.use('/products', priceController)
router.use('/categories', categoriesController);
router.use('/products', productsController);
router.use('/basket', basketController)
router.use('/settings', settingsController)
router.use('/compliance', complianceController)
router.use('/analytics', analyticsController)

export default router