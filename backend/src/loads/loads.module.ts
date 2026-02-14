import { Module } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { LoadsController } from './loads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Load } from './entities/load.entity';
import { User } from 'src/users/entities/user.entity';
import { LoadAplication } from 'src/load-aplications/entities/load-aplication.entity';
import { LoadAssignment } from 'src/load-assignments/entities/load-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Load, User, LoadAplication, LoadAssignment])],
  providers: [LoadsService],
  controllers: [LoadsController]
})
export class LoadsModule {}
