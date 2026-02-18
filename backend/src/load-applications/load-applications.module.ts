import { Module } from '@nestjs/common';
import { LoadApplicationsService } from './load-applications.service';
import { LoadApplicationsController } from './load-applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadApplication } from './entities/load-application.entity';
import { User } from 'src/users/entities/user.entity';
import { Load } from 'src/loads/entities/load.entity';
import { LoadAssignment } from 'src/load-assignments/entities/load-assignment.entity';
import { QueryService } from 'src/common/query/query.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoadApplication, Load, User, LoadAssignment])],
  providers: [LoadApplicationsService, QueryService],
  controllers: [LoadApplicationsController]
})
export class LoadApplicationsModule {}
