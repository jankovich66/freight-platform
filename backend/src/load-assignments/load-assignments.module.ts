import { Module } from '@nestjs/common';
import { LoadAssignmentsService } from './load-assignments.service';
import { LoadAssignmentsController } from './load-assignments.controller';

@Module({
  providers: [LoadAssignmentsService],
  controllers: [LoadAssignmentsController]
})
export class LoadAssignmentsModule {}
