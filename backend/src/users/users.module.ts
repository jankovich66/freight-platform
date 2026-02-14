import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Load } from 'src/loads/entities/load.entity';
import { LoadAplication } from 'src/load-aplications/entities/load-aplication.entity';
import { LoadAssignment } from 'src/load-assignments/entities/load-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Load, LoadAplication, LoadAssignment])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
