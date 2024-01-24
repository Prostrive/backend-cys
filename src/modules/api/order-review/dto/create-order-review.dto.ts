export class CreateOrderReviewDto {
  orderId: string;
  deliverySatisfied?: boolean | null;
  deliveryAdditionalComments?: string | null;
}
