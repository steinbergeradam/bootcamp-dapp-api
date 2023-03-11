import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BigNumber } from 'ethers';
import { Minter } from '../models/minter.model';
import { MintService } from '../services/mint.service';
import { IMintController } from './interfaces/mint.controller.interface';

@Controller()
export class MintController implements IMintController {
  constructor(private readonly mintService: MintService) {}

  @Post()
  @ApiBody({ type: Minter })
  async mintTokens(@Body() body: Minter): Promise<BigNumber> {
    return await this.mintService.mintTokens(body);
  }
}
