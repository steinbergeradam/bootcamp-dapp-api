import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VoteController } from '../controllers/vote.controller';
import { VoteService } from '../services/vote.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
