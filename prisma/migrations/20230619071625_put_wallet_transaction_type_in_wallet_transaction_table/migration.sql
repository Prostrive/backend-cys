/*
  Warnings:

  - You are about to drop the column `createdAt` on the `WalletTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WalletTransaction` table. All the data in the column will be lost.
  - Added the required column `walletTransactionType` to the `WalletTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletTransactionType" AS ENUM ('increase', 'decrease');

-- AlterTable
ALTER TABLE "WalletTransaction" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "walletTransactionType" "WalletTransactionType" NOT NULL;
