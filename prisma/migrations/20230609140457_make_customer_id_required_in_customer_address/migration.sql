/*
  Warnings:

  - Made the column `customerId` on table `CustomerAddress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CustomerAddress" ALTER COLUMN "customerId" SET NOT NULL;
