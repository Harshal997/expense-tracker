import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expense.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/health", healthRoutes);

app.use("/auth", authRoutes);

app.use("/expenses", expenseRoutes);

app.use("/dashboard", dashboardRoutes);

app.use(errorHandler);

export default app;
