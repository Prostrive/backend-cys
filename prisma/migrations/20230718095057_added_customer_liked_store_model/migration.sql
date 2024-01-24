-- CreateTable
CREATE TABLE "CustomerLikedStores" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerLikedStores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerLikedStores" ADD CONSTRAINT "CustomerLikedStores_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerLikedStores" ADD CONSTRAINT "CustomerLikedStores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
