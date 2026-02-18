import { Module } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { LoadsController } from './loads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Load } from './entities/load.entity';
import { User } from 'src/users/entities/user.entity';
import { LoadApplication } from 'src/load-applications/entities/load-application.entity';
import { LoadAssignment } from 'src/load-assignments/entities/load-assignment.entity';
import { QueryService } from 'src/common/query/query.service';

@Module({
  imports: [TypeOrmModule.forFeature([Load, User, LoadApplication, LoadAssignment])],
  providers: [LoadsService, QueryService],
  controllers: [LoadsController]
})
export class LoadsModule {}
