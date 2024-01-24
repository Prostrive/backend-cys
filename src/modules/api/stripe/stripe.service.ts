import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import Stripe from 'stripe';
import { stripeNoDecimalAmount } from '@/utils/numbers';
import {
  CreatePaymentIntentDto,
  CreateTransferDto,
} from './dto/create-payment-intent.dto';

@Injectable()
export class StripeService {
  private stripe;
  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createPaymentIntent(orders: CreatePaymentIntentDto) {
    let amount = 0;
    let totalQuantity = 0;
    const deliveryFee = 3;

    await Promise.all(
      orders?.orders.map(async (order: any) => {
        const product = await this.prisma.product.findUnique({
          where: { id: order.productId },
        });
        if (product) {
          amount += product.discountedPrice ?? product.price * order.quantity;
          totalQuantity += totalQuantity;
        }
      }),
    );

    const transferGroup = nanoid();
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: stripeNoDecimalAmount(amount + deliveryFee - orders.discount),
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      transfer_group: transferGroup,
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      transferGroup,
    };
  }

  async createTransfer(transferDetails: CreateTransferDto) {
    const transfer = await this.stripe.transfers.create({
      amount: stripeNoDecimalAmount(transferDetails.amount),
      currency: 'eur',
      destination: transferDetails.stripeId,
      transfer_group: transferDetails.transferGroup,
    });
    return {
      transferStore: transfer,
    };
  }

  async createRefund(paymentIntent: string, amount: number) {
    const splitPaymentIntent = paymentIntent.split('_');
    const payment_intent = `${splitPaymentIntent[0]}_${splitPaymentIntent[1]}`;
    return await this.stripe.refunds.create({
      payment_intent,
      amount: stripeNoDecimalAmount(amount),
    });
  }

  async webhooks(request: any, response: any) {
    const body = request.rawBody;
    const sig = request.headers['stripe-signature'];
    let event;
    const webhookKey = process.env.STRIPE_WEBHOOK_KEY;

    try {
      event = this.stripe.webhooks.constructEvent(body, sig, webhookKey);
    } catch (err) {
      console.log(err);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case 'account.updated':
        const { charges_enabled: stripeActivated } = event.data.object;
        const { storeId: id } = event.data.object.metadata;

        if (!id) break;

        await this.prisma.store.update({
          where: {
            id,
          },
          data: {
            stripeActivated,
          },
        });
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return response.send();
  }
}
