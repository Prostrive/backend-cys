import { inviteEmailTemplate } from '@/helpers/mail';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { auth } from 'firebase-admin';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

interface ProductData {
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

interface StoreData {
  storeName: string;
  orderLine: ProductData[];
  storeTotal: number;
}

interface OrderData {
  orderNumber: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  orders: StoreData[];
  customerDetails: any;
}

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail(mail: SendGrid.MailDataRequired) {
    try {
      const res = await SendGrid.send(mail);
      return res;
    } catch (error) {
      return error.response.body;
    }
  }

  async sendInvite(email: string) {
    const { emailVerified } = await auth().getUserByEmail(email);

    if (emailVerified) return;

    const link = await auth().generatePasswordResetLink(email);

    this.sendEmail({
      from: 'info@prostrive.io',
      to: email,
      subject: 'Collect Your Shopping Invite',
      html: inviteEmailTemplate(link),
    });
  }

  async sendOrderConfirmationEmail(email: string, orderData: OrderData) {
    const senderEmail = 'info@prostrive.io';
    const basePath = path.join(process.cwd(), 'src');
    const templatePath = path.join(
      basePath,
      'templates',
      'orderConfirmation.html',
    );
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = Handlebars.compile(template);
    const html = compiledTemplate(orderData);

    this.sendEmail({
      from: senderEmail,
      to: email,
      subject: 'Order Confirmation',
      html,
    });
  }
}
