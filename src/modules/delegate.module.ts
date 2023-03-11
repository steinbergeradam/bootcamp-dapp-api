import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DelegateController } from '../controllers/delegate.controller';
import { DelegateService } from '../services/delegate.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [DelegateController],
  providers: [DelegateService],
})
export class DelegateModule {}
