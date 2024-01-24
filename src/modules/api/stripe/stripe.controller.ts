import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  create(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
    if (!createPaymentIntentDto.discount) {
      createPaymentIntentDto.discount = 0;
    }
    return this.stripeService.createPaymentIntent(createPaymentIntentDto);
  }

  @Post('webhooks')
  webhooks(@Req() request: any, @Res() response: any) {
    return this.stripeService.webhooks(request, response);
  }
}
