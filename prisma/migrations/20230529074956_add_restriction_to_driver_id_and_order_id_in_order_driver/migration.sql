/*
  Warnings:

  - A unique constraint covering the columns `[driverId,orderId]` on the table `OrderDriver` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderDriver_driverId_orderId_key" ON "OrderDriver"("driverId", "orderId");
