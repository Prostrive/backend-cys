interface OrdersObjectInterface {
  productId: string;
  quantity: number;
}

export class CreatePaymentIntentDto {
  orders: OrdersObjectInterface[];
  discount?: number;
}

export class CreateTransferDto {
  amount: number;
  currency: string;
  stripeId: string;
  transferGroup: string;
}
