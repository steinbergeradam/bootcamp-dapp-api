import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MintController } from '../controllers/mint.controller';
import { MintService } from '../services/mint.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
