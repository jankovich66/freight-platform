import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadAssignment } from './entities/load-assignment.entity';
import { Repository } from 'typeorm';
import { UserFromRequest } from 'src/auth/interfaces/user-from-request.interface';

@Injectable()
export class LoadAssignmentsService {
    constructor(
        @InjectRepository(LoadAssignment)
        private readonly loadAssignmentsRepository: Repository<LoadAssignment>
    ) {}

    async findAll(): Promise<LoadAssignment[]> {
        return await this.loadAssignmentsRepository.find();
    }

    async findOne(id: number): Promise<LoadAssignment> {
        const loadAssignment = await this.loadAssignmentsRepository.findOneBy({ id });

        if(!loadAssignment) {
            throw new NotFoundException(`Load assignment with id ${ id } not found`);
        }
        return loadAssignment;
    }

    async findByCarrier(carrierId: number): Promise<LoadAssignment[]> {
        const loadAssignments = await this.loadAssignmentsRepository.find({
            where: {
                carrier: { id: carrierId }
            },
            relations: ['load']
        });

        return loadAssignments;
    }

    async findForLoad(loadId: number, user: UserFromRequest): Promise<LoadAssignment> {
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

    async remove(id: number): Promise<void> {
        await this.loadAssignmentsRepository.delete(id);
    }
}
