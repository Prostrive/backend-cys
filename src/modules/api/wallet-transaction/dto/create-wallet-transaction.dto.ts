import { WalletTransactionType } from '@prisma/client';

export class CreateWalletTransactionDto {
  customerId: string;
  walletTransactionType: WalletTransactionType;
  amount: number;
  description: string;
  orderId?: string;
}
