/*
  Warnings:

  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `updatedAt` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- CreateIndex
CREATE INDEX "Expense_userId_idx" ON "public"."Expense"("userId");

-- CreateIndex
CREATE INDEX "Expense_category_idx" ON "public"."Expense"("category");

-- CreateIndex
CREATE INDEX "Expense_date_idx" ON "public"."Expense"("date");
