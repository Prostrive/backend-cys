import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { WalletTransactionService } from './wallet-transaction.service';
import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';

@Controller('wallet-transaction')
export class WalletTransactionController {
  constructor(
    private readonly walletTransactionService: WalletTransactionService,
  ) {}

  @Post()
  create(@Body() createWalletTransactionDto: CreateWalletTransactionDto) {
    return this.walletTransactionService.create(createWalletTransactionDto);
  }

  @Get(':customerId')
  @UseGuards(FirebaseAuthGuard)
  fetchTransactionsByCustomer(@Param('customerId') customerId: string) {
    return this.walletTransactionService.fetchTransactionsByCustomer(
      customerId,
    );
  }
}
