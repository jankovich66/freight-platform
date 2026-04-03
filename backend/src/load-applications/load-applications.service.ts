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
import { LoadApplicationQueryDto } from './dto/load-application-query.dto';
import { QueryService } from 'src/common/query/query.service';
import { LOAD_APPLICATION_QUERY_CONFIG } from './load-application-query.config';

@Injectable()
export class LoadApplicationsService {
    constructor(
        private readonly queryService: QueryService,
        @InjectRepository(LoadApplication)
        private readonly loadApplicationRepository: Repository<LoadApplication>,
        @InjectRepository(Load)
        private readonly loadRepository: Repository<Load>,
        private dataSource: DataSource
    ) {}

    async findAll(user: UserFromRequest, loadApplicationQueryDto: LoadApplicationQueryDto) {
        if(user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('Only admin can access');
        }

        return this.queryService.findWithQuery(this.loadApplicationRepository, loadApplicationQueryDto, LOAD_APPLICATION_QUERY_CONFIG, (qb) => { qb.leftJoinAndSelect('loadApplication.load', 'load') });
    }

    async findOne(user: UserFromRequest, id: number): Promise<LoadApplication> {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.CARRIER) {
            throw new ForbiddenException('Only shippers can access');
        }
        
        const loadAplication = await this.loadApplicationRepository.findOneBy({ id });

        if(!loadAplication) {
            throw new NotFoundException(`Load aplications with id ${ id } not found`);
        }

        return loadAplication;
    }

    async findByLoad(user: UserFromRequest, loadId: number, loadApplicationQueryDto: LoadApplicationQueryDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access applications')
        }

        const load = await this.loadRepository.findOne({
            where: { id: loadId },
            relations: ['shipper']
        });

        if(!load) {
            throw new NotFoundException('Load not found');
        }

        if(load.shipper.id !== user.id && user.role !== UserRole.ADMIN) {
            throw new ForbiddenException(`You don't have access to this load`);
        }

        return this.queryService.findWithQuery(this.loadApplicationRepository, loadApplicationQueryDto, LOAD_APPLICATION_QUERY_CONFIG, (qb) => { qb.andWhere('loadApplication.load.id = :loadId', { loadId }) });
    }

    async findMyApplications(user: UserFromRequest, loadApplicationQueryDto: LoadApplicationQueryDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.CARRIER) {
            throw new ForbiddenException('Only carriers can access')
        }
        
        return this.queryService.findWithQuery(this.loadApplicationRepository, loadApplicationQueryDto, LOAD_APPLICATION_QUERY_CONFIG, (qb) => { qb.leftJoinAndSelect('loadApplication.load', 'load').andWhere('loadApplication.carrier.id = :userId', { userId: user.id }) });
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
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access');
        }
        
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

            if(application.status !== LoadApplicationStatus.PENDING) {
                throw new BadRequestException('Application already accepted');
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

    async update(user: UserFromRequest, id: number, updateLoadAplicationDto: UpdateLoadApplicationDto): Promise<LoadApplication> {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access');
        }

        const loadApplication = await this.loadApplicationRepository.find({
            where: { id: id }
        });

        if(!loadApplication) {
            throw new NotFoundException('Load application not found');
        }
        
        await this.loadApplicationRepository.update(id, updateLoadAplicationDto);
        
        return this.findOne(user, id);
    }

    async remove(user: UserFromRequest, id: number): Promise<void> {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.CARRIER) {
            throw new ForbiddenException('Only carriers can access');
        }

        await this.loadApplicationRepository.delete(id);
    }
}
