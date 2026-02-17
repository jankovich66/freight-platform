import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadAssignment } from './entities/load-assignment.entity';
import { Repository } from 'typeorm';
import { UserFromRequest } from 'src/auth/interfaces/user-from-request.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { Load } from 'src/loads/entities/load.entity';

@Injectable()
export class LoadAssignmentsService {
    constructor(
        @InjectRepository(LoadAssignment)
        private readonly loadAssignmentsRepository: Repository<LoadAssignment>,
        @InjectRepository(Load)
        private readonly loadRepository: Repository<Load>
    ) {}

    async findByCarrier(user: UserFromRequest, paginationDto: PaginationDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.CARRIER) {
            throw new ForbiddenException('Only carriers can access');
        }
        
        const { page = 1, limit = 10 } = paginationDto;
        
        const [data, total] = await this.loadAssignmentsRepository.findAndCount({
            where: {
                carrier: { id: user.id }
            },
            relations: ['load'],
            skip: (page - 1) * limit,
            take: limit
        });

        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        };
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
