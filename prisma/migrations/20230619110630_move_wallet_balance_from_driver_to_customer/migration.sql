/*
  Warnings:

  - You are about to drop the column `walletBalance` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `WalletTransaction` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `WalletTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WalletTransaction" DROP CONSTRAINT "WalletTransaction_driverId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "walletBalance" DECIMAL(12,2) NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "walletBalance";

-- AlterTable
ALTER TABLE "WalletTransaction" DROP COLUMN "driverId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
