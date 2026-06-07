"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpenseById = exports.getExpenses = exports.createExpense = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const expense = await client_1.default.expense.create({
        data: {
            title,
            amount,
            category,
            description,
            date: new Date(date),
            userId: req.user.userId,
        },
    });
    return res.status(201).json(expense);
};
exports.createExpense = createExpense;
const getExpenses = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.toString();
    const category = req.query.category?.toString();
    const skip = (page - 1) * limit;
    const where = {
        userId: req.user.userId,
    };
    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    if (category) {
        where.category = category;
    }
    const [expenses, total] = await Promise.all([
        client_1.default.expense.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                date: "desc",
            },
        }),
        client_1.default.expense.count({
            where,
        }),
    ]);
    return res.json({
        data: expenses,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
};
exports.getExpenses = getExpenses;
const getExpenseById = async (req, res) => {
    const id = req.params.id;
    const expense = await client_1.default.expense.findFirst({
        where: {
            id,
            userId: req.user.userId,
        },
    });
    if (!expense) {
        return res.status(404).json({
            message: "Expense not found",
        });
    }
    return res.json(expense);
};
exports.getExpenseById = getExpenseById;
const updateExpense = async (req, res) => {
    const id = req.params.id;
    const existing = await client_1.default.expense.findFirst({
        where: {
            id,
            userId: req.user.userId,
        },
    });
    if (!existing) {
        return res.status(404).json({
            message: "Expense not found",
        });
    }
    const updated = await client_1.default.expense.update({
        where: {
            id,
        },
        data: {
            ...req.body,
            ...(req.body.date && {
                date: new Date(req.body.date),
            }),
        },
    });
    return res.json(updated);
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res) => {
    const id = req.params.id;
    const existing = await client_1.default.expense.findFirst({
        where: {
            id,
            userId: req.user.userId,
        },
    });
    if (!existing) {
        return res.status(404).json({
            message: "Expense not found",
        });
    }
    await client_1.default.expense.delete({
        where: {
            id,
        },
    });
    return res.json({
        message: "Expense deleted successfully",
    });
};
exports.deleteExpense = deleteExpense;
