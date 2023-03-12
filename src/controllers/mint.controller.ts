import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Minter } from '../models/minter.model';
import { MintService } from '../services/mint.service';
import { IMintController } from './interfaces/mint.controller.interface';

@Controller()
export class MintController implements IMintController {
  constructor(private readonly mintService: MintService) {}

  @Post()
  @ApiBody({ type: Minter })
  async mintTokens(@Body() body: Minter): Promise<string> {
    return await this.mintService.mintTokens(body);
  }

  @Get("total-supply")
  async getTotalSupply(): Promise<number> {
    return await this.mintService.getTotalSupply();
  }
}
