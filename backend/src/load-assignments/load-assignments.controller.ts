import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LoadAssignmentsService } from './load-assignments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('load-assignments')
export class LoadAssignmentsController {
    constructor(
        private readonly loadAssignmentsService: LoadAssignmentsService
    ) {}

    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Get('my')
    findMyAssignments(@GetUser() user) {
        return this.loadAssignmentsService.findByCarrier(user.id);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get('load/:loadId')
    findForLoad(@Param('loadId', ParseIntPipe) loadId: number, @GetUser() user) {
        return this.loadAssignmentsService.findForLoad(loadId, user);
    }
}
