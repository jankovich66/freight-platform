import { Module } from '@nestjs/common';
import { LoadApplicationsService } from './load-applications.service';
import { LoadApplicationsController } from './load-applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadApplication } from './entities/load-application.entity';
import { User } from 'src/users/entities/user.entity';
import { Load } from 'src/loads/entities/load.entity';
import { LoadAssignment } from 'src/load-assignments/entities/load-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoadApplication, Load, User, LoadAssignment])],
  providers: [LoadApplicationsService],
  controllers: [LoadApplicationsController]
})
export class LoadApplicationsModule {}
