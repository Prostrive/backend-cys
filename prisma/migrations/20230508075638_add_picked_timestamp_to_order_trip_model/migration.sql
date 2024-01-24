/*
  Warnings:

  - Made the column `acceptedTimestamp` on table `OrderTrip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderTrip" ADD COLUMN     "pickedTimestamp" TIMESTAMP(3),
ALTER COLUMN "acceptedTimestamp" SET NOT NULL;
