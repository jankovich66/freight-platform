import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoadsModule } from './loads/loads.module';
import { LoadApplicationsModule } from './load-applications/load-applications.module';
import { LoadAssignmentsModule } from './load-assignments/load-assignments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'db',//configService.get<string>('DB_HOST'),
        port: 5432,//configService.get<number>('DB_PORT'),
        username: 'admin',//configService.get<string>('DB_USER'),
        password: 'admin',//configService.get<string>('DB_PASSWORD'),
        database: 'freight_platform',//configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true
      })
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
