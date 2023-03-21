import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { TokenRequest } from './models/token.request.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("contract-address")
  getContractAddress(): {address: string} {
    return {address: this.appService.getContractAddress()};
  }

  @Get("total-supply")
  async getTotalSupply(): Promise<{total: number}> {
    return await this.appService.getTotalSupply();
  }

  @Get("transaction-status")
  async getTransactionStatus(@Query('hash') hash: string): Promise<{status: string}> {
    return await this.appService.getTransactionStatus(hash);
  }

  @Post("request-tokens")
  @ApiBody({ type: TokenRequest })
  async requestTokens(@Body() tokenRequest: TokenRequest): Promise<{balance: string}> {
    return await this.appService.requestTokens(tokenRequest.address, tokenRequest.amount);
  }

  @Post("deploy-ballot")
  async deployBallot(@Body() proposals: string[]): Promise<{address: string, blockNumber: number}> {
    return await this.appService.deployBallot(proposals);
  }

  @Get("winning-proposal")
  async getWinningProposal(): Promise<{winner: string}> {
    return await this.appService.getWinningProposal();
  }
}
