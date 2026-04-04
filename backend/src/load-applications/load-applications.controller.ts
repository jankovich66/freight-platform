import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LoadApplicationsService } from './load-applications.service';
import { CreateLoadApplicationDto } from './dto/create-load-application.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { LoadApplicationQueryDto } from './dto/load-application-query.dto';
import { UserQueryDto } from 'src/users/dto/user-query.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('load-applications')
export class LoadApplicationsController {
    constructor(private readonly loadApplicationsService: LoadApplicationsService) {}

    @Roles(UserRole.ADMIN)
    @Get()
    findAll(@GetUser() user, @Query() loadApplicationQueryDto: LoadApplicationQueryDto) {
        return this.loadApplicationsService.findAll(user, loadApplicationQueryDto);
    }

    @Roles(UserRole.ADMIN)
    @Get('carriers-with-applications')
    findCarrierWithApplications(@GetUser() user, @Query() userQueryDto: UserQueryDto) {
        return this.loadApplicationsService.findCarrierWithApplications(user, userQueryDto);
    }

    @Roles(UserRole.ADMIN)
    @Get('applications-for-carrier/:carrierId')
    getApplicationsForCarrier(@GetUser() user, @Param('carrierId', ParseIntPipe) carrierId: number, @Query() loadApplicationQueryDto: LoadApplicationQueryDto) {
        return this.loadApplicationsService.getApplicationsForCarrier(user, carrierId, loadApplicationQueryDto);
    }

    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Get('my')
    findMyApplications(@GetUser() user, @Query() loadApplicationQueryDto: LoadApplicationQueryDto) {
        return this.loadApplicationsService.findMyApplications(user, loadApplicationQueryDto);
    }

    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Get(':id')
    findOne(@GetUser() user, @Param('id', ParseIntPipe) id: number) {
        return this.loadApplicationsService.findOne(user, id);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get('by-load/:loadId')
    findByLoad(@GetUser() user, @Param('loadId', ParseIntPipe) loadId: number, @Query() laodApplicationQueryDto: LoadApplicationQueryDto) {
        return this.loadApplicationsService.findByLoad(user, loadId, laodApplicationQueryDto);
    }

    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Post(':loadId/apply')
    apply(@GetUser() user, @Param('loadId', ParseIntPipe) loadId: number, @Body() createLoadAplicationDto: CreateLoadApplicationDto) {
        return this.loadApplicationsService.create(user, loadId, createLoadAplicationDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Patch(':applicationId/accept')
    accept(@Param('applicationId', ParseIntPipe) applicationId: number, @GetUser() user) {
        return this.loadApplicationsService.accept(user, applicationId);
    }

    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Delete(':id')
    remove(@GetUser() user, @Param('id', ParseIntPipe) id: number) {
        return this.loadApplicationsService.remove(user, id);
    }
}
