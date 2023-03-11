import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResultController } from '../controllers/result.controller';
import { ResultService } from '../services/result.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
