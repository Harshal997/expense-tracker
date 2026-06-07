import { Router } from "express";

import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller";

import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../validations/expense.validation";

import { validate } from "../middleware/validate.middleware";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", validate(createExpenseSchema), createExpense);

router.get("/", getExpenses);

router.get("/:id", getExpenseById);

router.put("/:id", validate(updateExpenseSchema), updateExpense);

router.delete("/:id", deleteExpense);

export default router;
