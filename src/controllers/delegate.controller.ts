import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Delegation } from '../models/delegation.model';
import { DelegateService } from '../services/delegate.service';
import { IDelegateController } from './interfaces/delegate.controller.interface';

@Controller()
export class DelegateController implements IDelegateController {
  constructor(private readonly delegateService: DelegateService) {}

  @Post()
  @ApiBody({ type: Delegation })
  async delegateVote(@Body() body: Delegation): Promise<string> {
    return await this.delegateService.delegateVote(body);
  }

  @Get("allowance")
  async getAllowance(@Param('from') from: string, @Param('to') to: string): Promise<number> {
    return await this.delegateService.getAllowance(from, to);
  }
}
