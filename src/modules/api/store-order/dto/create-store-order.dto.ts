export class CreateStoreOrderDto {
  orderId: string;
  storeId: string;
  pickUpCode: string;
  storeNote?: string;
}
