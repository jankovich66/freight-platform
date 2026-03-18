import { Controller, Get, UseGuards, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from './entities/user.entity';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get('number')
    findNumberOfUsers() {
        return this.usersService.findNumberOfUsers();
    }

    @Delete()
    remove(@GetUser() user, @Body() email: string) {
        return this.usersService.remove(user, email);
    }
}
