import { Controller, Get } from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { IResultController } from './interfaces/result.controller.interface';

@Controller()
export class ResultController implements IResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  async getWinningProposal(): Promise<string> {
    return await this.resultService.getWinningProposal();
  }
}
