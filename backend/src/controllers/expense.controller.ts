import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createExpense = async (req: Request, res: Response) => {
  const { title, amount, category, description, date } = req.body;

  const expense = await prisma.expense.create({
    data: {
      title,
      amount,
      category,
      description,
      date: new Date(date),
      userId: req.user!.userId,
    },
  });

  return res.status(201).json(expense);
};

export const getExpenses = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search?.toString();
  const category = req.query.category?.toString();
  const skip = (page - 1) * limit;
  const where: any = {
    userId: req.user!.userId,
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
    prisma.expense.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        date: "desc",
      },
    }),

    prisma.expense.count({
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

export const getExpenseById = async (req: Request, res: Response) => {
  const expense = await prisma.expense.findFirst({
    where: {
      id: req.params.id,

      userId: req.user!.userId,
    },
  });

  if (!expense) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  return res.json(expense);
};

export const updateExpense = async (req: Request, res: Response) => {
  const existing = await prisma.expense.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.userId,
    },
  });

  if (!existing) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  const updated = await prisma.expense.update({
    where: {
      id: req.params.id,
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

export const deleteExpense = async (req: Request, res: Response) => {
  const existing = await prisma.expense.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.userId,
    },
  });

  if (!existing) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  await prisma.expense.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.json({
    message: "Expense deleted successfully",
  });
};
