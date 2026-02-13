import { Module } from '@nestjs/common';
import { LoadAplicationsService } from './load-aplications.service';
import { LoadAplicationsController } from './load-aplications.controller';

@Module({
  providers: [LoadAplicationsService],
  controllers: [LoadAplicationsController]
})
export class LoadAplicationsModule {}
