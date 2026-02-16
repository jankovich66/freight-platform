import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadAssignment } from './entities/load-assignment.entity';
import { Repository } from 'typeorm';
import { CreateLoadAssignmentDto } from './dto/create-load-assignment.dto';
import { UpdateLoadAssignmentDto } from './dto/update-load-assignment.dto';

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

    async create(createLoadAssignmentDto: CreateLoadAssignmentDto): Promise<LoadAssignment> {
        const loadAssignment = this.loadAssignmentsRepository.create({
            ...createLoadAssignmentDto,
            carrier: { id: createLoadAssignmentDto.carrierId },
            load: { id: createLoadAssignmentDto.loadId }
        });

        return this.loadAssignmentsRepository.save(loadAssignment);
    }

    async update(id: number, updateLoadAssignmentDto: UpdateLoadAssignmentDto): Promise<LoadAssignment> {
        await this.loadAssignmentsRepository.update(id, {
            carrier: { id: updateLoadAssignmentDto.loadId },
            load: { id: updateLoadAssignmentDto.loadId }
        });

        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.loadAssignmentsRepository.delete(id);
    }
}
