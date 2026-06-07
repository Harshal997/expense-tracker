"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryChart = exports.getExpenseChart = exports.getDashboardSummary = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getDashboardSummary = async (req, res) => {
    const userId = req.user.userId;
    const currentDate = new Date();
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const [totalExpenses, monthlyExpenses, transactionCount, recentTransactions] = await Promise.all([
        client_1.default.expense.aggregate({
            where: {
                userId,
            },
            _sum: {
                amount: true,
            },
        }),
        client_1.default.expense.aggregate({
            where: {
                userId,
                date: {
                    gte: monthStart,
                },
            },
            _sum: {
                amount: true,
            },
        }),
        client_1.default.expense.count({
            where: {
                userId,
            },
        }),
        client_1.default.expense.findMany({
            where: {
                userId,
            },
            take: 5,
            orderBy: {
                date: "desc",
            },
        }),
    ]);
    return res.json({
        totalExpenses: totalExpenses._sum.amount || 0,
        monthlyExpenses: monthlyExpenses._sum.amount || 0,
        transactionCount,
        recentTransactions,
    });
};
exports.getDashboardSummary = getDashboardSummary;
const getExpenseChart = async (req, res) => {
    const userId = req.user.userId;
    const expenses = await client_1.default.expense.findMany({
        where: {
            userId,
        },
        orderBy: {
            date: "asc",
        },
    });
    const monthMap = new Map();
    expenses.forEach((expense) => {
        const month = expense.date.toLocaleString("default", {
            month: "short",
        });
        monthMap.set(month, (monthMap.get(month) || 0) + Number(expense.amount));
    });
    const chartData = Array.from(monthMap.entries()).map(([month, amount]) => ({
        month,
        amount,
    }));
    return res.json(chartData);
};
exports.getExpenseChart = getExpenseChart;
const getCategoryChart = async (req, res) => {
    const expenses = await client_1.default.expense.findMany({
        where: {
            userId: req.user.userId,
        },
    });
    const map = new Map();
    expenses.forEach((expense) => {
        map.set(expense.category, (map.get(expense.category) || 0) + Number(expense.amount));
    });
    const data = Array.from(map.entries()).map(([category, amount]) => ({
        category,
        amount,
    }));
    return res.json(data);
};
exports.getCategoryChart = getCategoryChart;
