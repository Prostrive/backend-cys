import { Injectable } from '@nestjs/common';
import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';

@Injectable()
export class WalletTransactionService {
  constructor(private readonly prisma: PrismaService) {}
  create(createWalletTransactionDto: CreateWalletTransactionDto) {
    return this.prisma.walletTransaction.create({
      data: createWalletTransactionDto,
    });
  }
  fetchTransactionsByCustomer(customerId: string) {
    return this.prisma.walletTransaction.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: {
        order: {
          include: {
            storeOrder: {
              include: { orderLines: true, store: { select: { name: true } } },
            },
          },
        },
      },
    });
  }
}
