import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { DeployService } from '../services/deploy.service';
import { IDeployController } from './interfaces/deploy.controller.interface';

@Controller()
export class DeployController implements IDeployController {
  constructor(private readonly deployService: DeployService) {}

  @Post()
  async deployContracts(@Body() body: string[]): Promise<string[]> {
    return await this.deployService.deployContracts(body);
  }
}
