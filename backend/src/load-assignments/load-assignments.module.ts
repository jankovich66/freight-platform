import { Module } from '@nestjs/common';
import { LoadAssignmentsService } from './load-assignments.service';
import { LoadAssignmentsController } from './load-assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadAssignment } from './entities/load-assignment.entity';
import { User } from 'src/users/entities/user.entity';
import { Load } from 'src/loads/entities/load.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoadAssignment, User, Load])],
  providers: [LoadAssignmentsService],
  controllers: [LoadAssignmentsController]
})
export class LoadAssignmentsModule {}
