import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  getCategoryChart,
  getDashboardSummary,
  getExpenseChart,
} from "../controllers/dashboard.controller";

const router = Router();

router.use(authMiddleware);

router.get("/summary", getDashboardSummary);

router.get("/chart", getExpenseChart);

router.get("/category-chart", getCategoryChart);

export default router;
