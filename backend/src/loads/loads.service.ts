import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Load, LoadStatus } from './entities/load.entity';
import { Repository } from 'typeorm';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { UserFromRequest } from 'src/auth/interfaces/user-from-request.interface';
import { LoadQueryDto } from './dto/load-query.dto';
import { QueryService } from 'src/common/query/query.service';
import { LOAD_QUERY_CONFIG } from './load-query.config';

@Injectable()
export class LoadsService {
    constructor(
        private readonly queryService: QueryService,
        @InjectRepository(Load)
        private readonly loadsRepository: Repository<Load>
    ) {}

    async findAll(user: UserFromRequest, loadQueryDto: LoadQueryDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access');
        }
        
        return this.queryService.findWithQuery(this.loadsRepository, loadQueryDto, LOAD_QUERY_CONFIG);
    }

    async findOne(user: UserFromRequest, id: number): Promise<Load> {
        const load = await this.loadsRepository.findOneBy({ id });
    
        if(!load) {
            throw new NotFoundException(`Load with id ${ id } not found`);
        }
        return load;
    }

    async findMyLoads(user: UserFromRequest, loadQueryDto: LoadQueryDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access');
        }
        
        return this.queryService.findWithQuery(this.loadsRepository, loadQueryDto, LOAD_QUERY_CONFIG, (qb) => { qb.andWhere('load.shipper.id = :userId', { userId: user.id }) });
    }

    async findOpenLoads(loadQueryDto: LoadQueryDto) {
        return this.queryService.findWithQuery(this.loadsRepository, loadQueryDto, LOAD_QUERY_CONFIG, (qb => { qb.andWhere('load.status = :status', { status: LoadStatus.OPEN }) }));
    }

    async create(user: UserFromRequest, createLoadDto: CreateLoadDto): Promise<Load> {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access');
        }
        
        const load = this.loadsRepository.create({
            ...createLoadDto,
            shipper: { id: user.id }
        });
        
        return await this.loadsRepository.save(load);
    }

    async update(user: UserFromRequest, id: number, updateLoadDto: UpdateLoadDto): Promise<Load | null> {        
        const load = await this.loadsRepository.findOne({
            where: { id },
            relations: ['shipper']
        });

        if(!load) {
            throw new NotFoundException(`Load with id ${ id } not found`);
        }

        if(user.role !== UserRole.ADMIN) {
            if(load.shipper.id !== user.id) {
                throw new ForbiddenException(`U don't have permission to access this load`);
            }
        }
        
        Object.assign(load, updateLoadDto);
        
        return this.loadsRepository.save(load);
    }

    async remove(user: UserFromRequest, id: number): Promise<void> {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access');
        }

        await this.loadsRepository.delete(id);
    }
}
