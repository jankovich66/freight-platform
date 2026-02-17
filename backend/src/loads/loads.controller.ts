import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('loads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LoadsController {
    constructor(private readonly loadsService: LoadsService) {}
    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get()
    findAll() {
        return this.loadsService.findAll();
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get(':id')
    findOne(@Param() id: number) {
        return this.loadsService.findOne(id);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Post()
    create(@GetUser() user, @Body() createLoadDto: CreateLoadDto) {
        return this.loadsService.create(user.id, createLoadDto);
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
    remove(@Param() id: number) {
        return this.loadsService.remove(id);
    }
}
