import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LoadsModule } from './loads/loads.module';
import { LoadApplicationsModule } from './load-applications/load-applications.module';
import { LoadAssignmentsModule } from './load-assignments/load-assignments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'admin',
      password: 'admin',
      database: 'freight_platform',
      autoLoadEntities: true,
      synchronize: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    LoadsModule,
    LoadApplicationsModule,
    LoadAssignmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
