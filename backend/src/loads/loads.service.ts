import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Load, LoadStatus } from './entities/load.entity';
import { Repository } from 'typeorm';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { UserFromRequest } from 'src/auth/interfaces/user-from-request.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class LoadsService {
    constructor(
        @InjectRepository(Load)
        private readonly loadsRepository: Repository<Load>
    ) {}

    async findAll(user: UserFromRequest, paginationDto: PaginationDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access');
        }

        const { page = 1, limit = 10} = paginationDto;

        const [data, total] = await this.loadsRepository.findAndCount({
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

    async findOne(user: UserFromRequest, id: number): Promise<Load> {
        const load = await this.loadsRepository.findOneBy({ id });
    
        if(!load) {
            throw new NotFoundException(`Load with id ${ id } not found`);
        }
        return load;
    }

    async findMyLoads(user: UserFromRequest, paginationDto: PaginationDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.SHIPPER) {
            throw new ForbiddenException('Only shippers can access');
        }
        
        const { page = 1, limit = 10 } = paginationDto;

        const [data, total] = await this.loadsRepository.findAndCount({
            where: { shipper: { id: user.id }},
            skip: (page - 1) / limit,
            take: limit
        });

        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        };
    }

    async findOpenLoads(paginationDto: PaginationDto) {
        const { page = 1, limit = 10 } = paginationDto;

        const [data, total] = await this.loadsRepository.findAndCount({
            where: { status: LoadStatus.OPEN },
            skip: (page - 1) / limit,
            take: limit
        });

        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        };
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
