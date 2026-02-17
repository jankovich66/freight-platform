import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LoadApplicationsService } from './load-applications.service';
import { CreateLoadApplicationDto } from './dto/create-load-application.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('load-applications')
export class LoadApplicationsController {
    constructor(private readonly loadApplicationsService: LoadApplicationsService) {}

    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Get()
    findAll() {
        return this.loadApplicationsService.findAll();
    }

    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Get(':id')
    findOne(@Param() id: number) {
        return this.loadApplicationsService.findOne(id);
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
    remove(@Param() id: number) {
        return this.loadApplicationsService.remove(id);
    }
}
