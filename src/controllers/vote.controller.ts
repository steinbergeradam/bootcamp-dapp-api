import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Vote } from '../models/vote.model';
import { VoteService } from '../services/vote.service';
import { IVoteController } from './interfaces/vote.controller.interface';

@Controller()
export class VoteController implements IVoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @ApiBody({ type: Vote })
  async castVote(@Body() body: Vote): Promise<string> {
    return await this.voteService.castVote(body);
  }
}
