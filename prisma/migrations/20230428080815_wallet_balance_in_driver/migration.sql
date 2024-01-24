/*
  Warnings:

  - Added the required column `walletBalance` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "walletBalance" DOUBLE PRECISION NOT NULL;
