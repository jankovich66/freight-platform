import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('loads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LoadsController {
    constructor(private readonly loadsService: LoadsService) {}
    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get()
    findAll(@GetUser() user, @Query() paginationDto: PaginationDto) {
        return this.loadsService.findAll(user, paginationDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get(':id')
    findOne(@GetUser() user, @Param() id: number) {
        return this.loadsService.findOne(user, id);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get('my')
    findMyLoads(@GetUser() user, @Query() paginationDto: PaginationDto) {
        return this.loadsService.findMyLoads(user, paginationDto);
    }

    @Get('open')
    findOpenLoads(@Query() paginationDto: PaginationDto) {
        return this.loadsService.findOpenLoads(paginationDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Post()
    create(@GetUser() user, @Body() createLoadDto: CreateLoadDto) {
        return this.loadsService.create(user, createLoadDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Patch(':id')
    update(@GetUser() user, @Param() id: number, @Body() updateLoadDto: UpdateLoadDto) {
        return this.loadsService.update(user, id, updateLoadDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Patch(':id/status')
    updateStatus(@GetUser() user, id: number, @Body() updateLoadDto: UpdateLoadDto) {
        return this.loadsService.update(user, id, updateLoadDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Delete(':id')
    remove(@GetUser() user, @Param() id: number) {
        return this.loadsService.remove(user, id);
    }
}
