export class CreateOrderTripDto {
  orderId: string;
  acceptedTimestamp?: Date;
  pickedTimestamp?: Date;
  pickupTimestamp?: Date;
  deliveredTimestamp?: Date;
}
