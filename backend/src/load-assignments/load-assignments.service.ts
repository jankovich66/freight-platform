import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadAssignment } from './entities/load-assignment.entity';
import { Repository } from 'typeorm';
import { UserFromRequest } from 'src/auth/interfaces/user-from-request.interface';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Load } from 'src/loads/entities/load.entity';
import { LoadAssignmentQueryDto } from './dto/load-assignment-query.dto';
import { QueryService } from 'src/common/query/query.service';
import { LOAD_ASSIGNMENT_QUERY_CONFIG } from './load-assignment-query.config';
import { UserQueryDto } from 'src/users/dto/user-query.dto';
import { USER_QUERY_CONFIG } from 'src/users/user-query.config';

@Injectable()
export class LoadAssignmentsService {
    constructor(
        private readonly queryService: QueryService,
        @InjectRepository(LoadAssignment)
        private readonly loadAssignmentsRepository: Repository<LoadAssignment>,
        @InjectRepository(Load)
        private readonly loadRepository: Repository<Load>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findCarriersWithAssignments(userFromRequers: UserFromRequest, userQueryDto: UserQueryDto) {
        if(userFromRequers.role !== UserRole.ADMIN) {
            throw new ForbiddenException('Only admins can access');
        }

        const carriers = await this.queryService.findWithQuery(this.userRepository, userQueryDto, USER_QUERY_CONFIG, (qb) => { qb.innerJoin('user.loadAssignments', 'loadAssignments').andWhere('user.role = :role', { role: UserRole.CARRIER }).distinct(true) });
        return {
            ...carriers,
            data: carriers.data.map(carrier => ({
                id: carrier.id,
                companyName: carrier.companyName
            }))
        };
    }

    async findMyAssignments(user: UserFromRequest, loadAssignmentQueryDto: LoadAssignmentQueryDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.CARRIER) {
            throw new ForbiddenException('Only carriers can access');
        }
        
        return this.queryService.findWithQuery(this.loadAssignmentsRepository, loadAssignmentQueryDto, LOAD_ASSIGNMENT_QUERY_CONFIG, (qb) => { qb.leftJoinAndSelect('loadAssignment.load', 'load').andWhere('loadAssignment.carrier.id = :userId', { userId: user.id }) });
    }

    async findByCarrier(user: UserFromRequest, loadAssignmentQueryDto: LoadAssignmentQueryDto, carrierId: number) {
        if(user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('Only admins can access');
        }

        return this.queryService.findWithQuery(this.loadAssignmentsRepository, loadAssignmentQueryDto, LOAD_ASSIGNMENT_QUERY_CONFIG, (qb) => { qb.leftJoinAndSelect('loadAssignment.load', 'load').andWhere('loadAssignment.carrier.id = :carrierId', { carrierId }) });
    }

    async findForLoad(loadId: number, user: UserFromRequest): Promise<LoadAssignment> {
        const load = await this.loadRepository.findOne({
            where: { id: loadId }
        });

        if(!load) {
            throw new NotFoundException('Load not found');
        }

        if(user.id !== load.shipper.id) {
            throw new ForbiddenException(`You don't have access to this load`);
        }
        
        const loadAssignments = await this.loadAssignmentsRepository.findOne({
            where: {
                load: { id: loadId }
            },
            relations: ['load', 'carrier', 'load.shipper']
        });

        if(!loadAssignments) {
            throw new NotFoundException('Load not found');
        }
        
        if(loadAssignments.load.shipper.id !== user.id) {
            throw new ForbiddenException(`You don't have access to this load`);
        }

        return loadAssignments;
    }
}
