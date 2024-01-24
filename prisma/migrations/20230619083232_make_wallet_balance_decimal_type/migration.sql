/*
  Warnings:

  - You are about to alter the column `walletBalance` on the `Driver` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "walletBalance" SET DEFAULT 0.0,
ALTER COLUMN "walletBalance" SET DATA TYPE DECIMAL(12,2);
