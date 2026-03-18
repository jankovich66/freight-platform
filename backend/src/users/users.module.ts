import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Load } from 'src/loads/entities/load.entity';
import { LoadApplication } from 'src/load-applications/entities/load-application.entity';
import { LoadAssignment } from 'src/load-assignments/entities/load-assignment.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Load, LoadApplication, LoadAssignment])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
