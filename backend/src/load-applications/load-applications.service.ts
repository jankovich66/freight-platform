import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadApplication, LoadApplicationStatus } from './entities/load-application.entity';
import { Not, Repository } from 'typeorm';
import { CreateLoadApplicationDto } from './dto/create-load-application.dto';
import { UpdateLoadApplicationDto } from './dto/update-load-application.dto';
import { UserFromRequest } from 'src/auth/interfaces/user-from-request.interface';
import { UserRole } from 'src/users/entities/user.entity';
import { Load, LoadStatus } from 'src/loads/entities/load.entity';
import { LoadAssignment } from 'src/load-assignments/entities/load-assignment.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LoadApplicationsService {
    constructor(
        @InjectRepository(LoadApplication)
        private readonly loadApplicationRepository: Repository<LoadApplication>,
        @InjectRepository(Load)
        private readonly loadRepository: Repository<Load>,
        @InjectRepository(LoadAssignment)
        private readonly loadAssignmentRepository: Repository<LoadAssignment>,
        private dataSource: DataSource
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

    async accept(user: UserFromRequest, applicationId: number): Promise<LoadAssignment> {
        return this.dataSource.transaction(async (manager) => {
            const application = await manager.findOne(LoadApplication, {
                where: { id: applicationId },
                relations: ['load', 'load.shipper', 'carrier']
            });

            if(!application) {
                throw new NotFoundException('Application not found');
            }

            if(application.load.shipper.id !== user.id) {
                throw new ForbiddenException(`You don't have access to this load`);
            }

            application.status = LoadApplicationStatus.ACCEPTED;
            await manager.save(application);

            await manager.update(
                LoadApplication,
                {
                    load: { id: application.load.id },
                    id: Not(applicationId)
                },
                { status: LoadApplicationStatus.REJECTED }
            );

            application.load.status = LoadStatus.ACCEPTED;
            await manager.save(application.load);

            const assignment = manager.create(LoadAssignment, {
                load: { id: application.load.id },
                carrier: { id: application.carrier.id }
            });

            await manager.save(assignment);

            return assignment;
        });
    }

    async update(id: number, updateLoadAplicationDto: UpdateLoadApplicationDto): Promise<LoadApplication> {
        await this.loadApplicationRepository.update(id, updateLoadAplicationDto);
        
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.loadApplicationRepository.delete(id);
    }
}
