-- CreateTable
CREATE TABLE "OrderTrip" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "acceptedTimestamp" TIMESTAMP(3),
    "pickupTimestamp" TIMESTAMP(3),
    "deliveredTimestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderTrip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderTrip_orderId_key" ON "OrderTrip"("orderId");

-- AddForeignKey
ALTER TABLE "OrderTrip" ADD CONSTRAINT "OrderTrip_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
