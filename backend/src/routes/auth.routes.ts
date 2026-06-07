import { Router } from "express";

import { login, register, me } from "../controllers/auth.controller";

import { loginSchema, registerSchema } from "../validations/auth.validation";

import { validate } from "../middleware/validate.middleware";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/me", authMiddleware, me);

export default router;
