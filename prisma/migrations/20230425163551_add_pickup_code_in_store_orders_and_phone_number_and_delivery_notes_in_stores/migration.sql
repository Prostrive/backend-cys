/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "deliveryNote" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "StoreOrder" ADD COLUMN     "pickUpCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Store_phoneNumber_key" ON "Store"("phoneNumber");
