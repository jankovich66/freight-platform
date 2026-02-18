import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { LoadQueryDto } from './dto/load-query.dto';

@Controller('loads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LoadsController {
    constructor(private readonly loadsService: LoadsService) {}
    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get()
    findAll(@GetUser() user, @Query() loadQueryDto: LoadQueryDto) {
        return this.loadsService.findAll(user, loadQueryDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get('my')
    findMyLoads(@GetUser() user, @Query() loadQueryDto: LoadQueryDto) {
        return this.loadsService.findMyLoads(user, loadQueryDto);
    }

    @Get('open')
    findOpenLoads(@Query() loadQueryDto: LoadQueryDto) {
        return this.loadsService.findOpenLoads(loadQueryDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get(':id')
    findOne(@GetUser() user, @Param('id', ParseIntPipe) id: number) {
        return this.loadsService.findOne(user, id);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Post()
    create(@GetUser() user, @Body() createLoadDto: CreateLoadDto) {
        return this.loadsService.create(user, createLoadDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Patch(':id')
    update(@GetUser() user, @Param('id', ParseIntPipe) id: number, @Body() updateLoadDto: UpdateLoadDto) {
        return this.loadsService.update(user, id, updateLoadDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Patch(':id/status')
    updateStatus(@GetUser() user, @Param('id', ParseIntPipe) id: number, @Body() updateLoadDto: UpdateLoadDto) {
        return this.loadsService.update(user, id, updateLoadDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Delete(':id')
    remove(@GetUser() user, @Param('id', ParseIntPipe) id: number) {
        return this.loadsService.remove(user, id);
    }
}
