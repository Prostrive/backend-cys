-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StoreAdvertisements" DROP CONSTRAINT "StoreAdvertisements_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StoreEmployee" DROP CONSTRAINT "StoreEmployee_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StoreManager" DROP CONSTRAINT "StoreManager_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StoreOpeningTime" DROP CONSTRAINT "StoreOpeningTime_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StoreOrder" DROP CONSTRAINT "StoreOrder_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StoreOrderPayment" DROP CONSTRAINT "StoreOrderPayment_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StoreStory" DROP CONSTRAINT "StoreStory_storeId_fkey";

-- AddForeignKey
ALTER TABLE "StoreManager" ADD CONSTRAINT "StoreManager_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreEmployee" ADD CONSTRAINT "StoreEmployee_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreOpeningTime" ADD CONSTRAINT "StoreOpeningTime_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreStory" ADD CONSTRAINT "StoreStory_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAdvertisements" ADD CONSTRAINT "StoreAdvertisements_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreOrder" ADD CONSTRAINT "StoreOrder_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreOrderPayment" ADD CONSTRAINT "StoreOrderPayment_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
