import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeployController } from '../controllers/deploy.controller';
import { DeployService } from '../services/deploy.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [DeployController],
  providers: [DeployService],
})
export class DeployModule {}
