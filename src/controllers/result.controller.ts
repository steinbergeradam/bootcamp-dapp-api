import { Controller, Get, Param } from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { IResultController } from './interfaces/result.controller.interface';

@Controller()
export class ResultController implements IResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  async getWinningProposal(): Promise<string> {
    return await this.resultService.getWinningProposal();
  }

  @Get("transaction-status/:hash")
  async getTransactionStatus(@Param('hash') hash: string): Promise<string> {
    return await this.resultService.getTransactionStatus(hash);
  }

  @Get("provider-network")
  getProviderNetwork(): string {
    return this.resultService.getProviderNetwork();
  }

  @Get("token-contract-address")
  getTokenContractAddress(): string {
    return this.resultService.getTokenContractAddress();
  }

  @Get("ballot-contract-address")
  getBallotContractAddress(): string {
    return this.resultService.getBallotContractAddress();
  }
}
