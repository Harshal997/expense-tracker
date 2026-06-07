"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpenseSchema = exports.createExpenseSchema = void 0;
const zod_1 = require("zod");
exports.createExpenseSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, "Title is required"),
    amount: zod_1.z.coerce
        .number()
        .positive()
        .positive("Amount must be greater than 0"),
    category: zod_1.z.enum([
        "FOOD",
        "TRAVEL",
        "BILLS",
        "SHOPPING",
        "HEALTH",
        "ENTERTAINMENT",
        "OTHER",
    ]),
    description: zod_1.z.string().optional(),
    date: zod_1.z.string(),
});
exports.updateExpenseSchema = exports.createExpenseSchema.partial();
