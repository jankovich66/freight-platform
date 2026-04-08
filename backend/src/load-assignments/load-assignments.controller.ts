import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { LoadAssignmentsService } from './load-assignments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { LoadAssignmentQueryDto } from './dto/load-assignment-query.dto';
import { UserQueryDto } from 'src/users/dto/user-query.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('load-assignments')
export class LoadAssignmentsController {
    constructor(
        private readonly loadAssignmentsService: LoadAssignmentsService
    ) {}
    
    @Roles(UserRole.ADMIN)
    @Get("carriers-with-assignments")
    findCarriersWithAssignments(@GetUser() user, @Query() UserQueryDto: UserQueryDto) {
        return this.loadAssignmentsService.findCarriersWithAssignments(user, UserQueryDto);
    }
    
    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Get('my')
    findMyAssignments(@GetUser() user, @Query() loadAssignmentQueryDto: LoadAssignmentQueryDto) {
        return this.loadAssignmentsService.findMyAssignments(user, loadAssignmentQueryDto);
    }
    
    @Roles(UserRole.ADMIN)
    @Get('assignments-for-carrier/:carrierId')
    findAssignmentsForCarrier(@Param('carrierId', ParseIntPipe) carrierId: number, @GetUser() user, @Query() loadAssignmentQueryDto: LoadAssignmentQueryDto) {
        return this.loadAssignmentsService.findByCarrier(user, loadAssignmentQueryDto, carrierId);
    }

    @Roles(UserRole.ADMIN, UserRole.SHIPPER)
    @Get('load/:loadId')
    findForLoad(@Param('loadId', ParseIntPipe) loadId: number, @GetUser() user) {
        return this.loadAssignmentsService.findForLoad(loadId, user);
    }

    @Roles(UserRole.ADMIN, UserRole.CARRIER)
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
        return this.loadAssignmentsService.findById(id, user);
    }
}
