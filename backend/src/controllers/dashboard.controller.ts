import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getDashboardSummary = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const currentDate = new Date();
  const monthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  const [totalExpenses, monthlyExpenses, transactionCount, recentTransactions] =
    await Promise.all([
      prisma.expense.aggregate({
        where: {
          userId,
        },

        _sum: {
          amount: true,
        },
      }),

      prisma.expense.aggregate({
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

      prisma.expense.count({
        where: {
          userId,
        },
      }),

      prisma.expense.findMany({
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

export const getExpenseChart = async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
    },

    orderBy: {
      date: "asc",
    },
  });

  const monthMap = new Map<string, number>();

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

export const getCategoryChart = async (req: Request, res: Response) => {
  const expenses = await prisma.expense.findMany({
    where: {
      userId: req.user!.userId,
    },
  });

  const map = new Map<string, number>();

  expenses.forEach((expense) => {
    map.set(
      expense.category,
      (map.get(expense.category) || 0) + Number(expense.amount),
    );
  });

  const data = Array.from(map.entries()).map(([category, amount]) => ({
    category,
    amount,
  }));

  return res.json(data);
};
