import { Module } from '@nestjs/common';
import { LoadAplicationsService } from './load-aplications.service';
import { LoadAplicationsController } from './load-aplications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadAplication } from './entities/load-aplication.entity';
import { User } from 'src/users/entities/user.entity';
import { Load } from 'src/loads/entities/load.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoadAplication, Load, User])],
  providers: [LoadAplicationsService],
  controllers: [LoadAplicationsController]
})
export class LoadAplicationsModule {}
