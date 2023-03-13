import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Mint } from './models/mint.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("contract-address")
  getContractAddress(): {address: string} {
    return {address: this.appService.getContractAddress()};
  }

  @Get("total-supply")
  async getTotalSupply(): Promise<number> {
    return await this.appService.getTotalSupply();
  }

  @Get("allowance")
  async getAllowance(
    @Query('from') from: string,
    @Query('to') to: string
  ): Promise<number> {
    return await this.appService.getAllowance(from, to);
  }

  @Get("transaction-status")
  async getTransactionStatus(@Query('hash') hash: string): Promise<string> {
    return await this.appService.getTransactionStatus(hash);
  }

  @Post("mint-tokens")
  @ApiBody({ type: Mint })
  mintTokens(@Body() mint: Mint): Promise<string> {
    return this.appService.mintTokens(mint.address, mint.tokens);
  }
}
