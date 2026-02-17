import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadApplication } from './entities/load-application.entity';
import { Repository } from 'typeorm';
import { CreateLoadApplicationDto } from './dto/create-load-application.dto';
import { UpdateLoadApplicationDto } from './dto/update-load-application.dto';
import { UserFromRequest } from 'src/auth/interfaces/user-from-request.interface';
import { UserRole } from 'src/users/entities/user.entity';
import { Load, LoadStatus } from 'src/loads/entities/load.entity';

@Injectable()
export class LoadApplicationsService {
    constructor(
        @InjectRepository(LoadApplication)
        private readonly loadApplicationRepository: Repository<LoadApplication>,
        @InjectRepository(Load)
        private readonly loadRepository: Repository<Load>
    
    ) {}

    async findAll(): Promise<LoadApplication[]> {
        return await this.loadApplicationRepository.find();
    }

    async findOne(id: number): Promise<LoadApplication> {
        const loadAplication = await this.loadApplicationRepository.findOneBy({ id });

        if(!loadAplication) {
            throw new NotFoundException(`Load aplications with id ${ id } not found`);
        }

        return loadAplication;
    }

    async create(user: UserFromRequest, loadId:number, createLoadAplicationDto: CreateLoadApplicationDto): Promise<LoadApplication> {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.CARRIER) {
            throw new ForbiddenException('Only carriers can apply');
        }

        const load = await this.loadRepository.findOne({
            where: { id: loadId }
        });

        if(!load) {
            throw new NotFoundException('Load not found');
        }

        if(load.status !== LoadStatus.OPEN) {
            throw new BadRequestException('Load is not open for applications');
        }
        
        const existingApplications = await this.loadApplicationRepository.findOne({
            where: {
                load: { id: loadId },
                carrier: { id: user.id }
            }
        });

        if(existingApplications) {
            throw new BadRequestException('You already applied to this load');
        }

        const loadApplication = this.loadApplicationRepository.create({
            ...createLoadAplicationDto,
            load: { id: loadId },
            carrier: { id: user.id }
        });

        return this.loadApplicationRepository.save(loadApplication);
    }

    async update(id: number, updateLoadAplicationDto: UpdateLoadApplicationDto): Promise<LoadApplication> {
        await this.loadApplicationRepository.update(id, updateLoadAplicationDto);
        
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.loadApplicationRepository.delete(id);
    }
}
