import { ForbiddenException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Load } from './entities/load.entity';
import { Repository } from 'typeorm';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { UserFromRequest } from 'src/auth/interfaces/user-from-request.interface';

@Injectable()
export class LoadsService {
    constructor(
        @InjectRepository(Load)
        private readonly loadsRepository: Repository<Load>
    ) {}

    async findAll(): Promise<Load[]> {
        return await this.loadsRepository.find();
    }

    async findOne(id: number): Promise<Load> {
        const load = await this.loadsRepository.findOneBy({ id });
    
        if(!load) {
            throw new NotFoundException(`Load with id ${ id } not found`);
        }
        return load;
    }

    async create(shipperId: number, createLoadDto: CreateLoadDto): Promise<Load> {
        const load = this.loadsRepository.create({
            ...createLoadDto,
            shipper: { id: shipperId }
        });
        console.log(load);
        
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

    async remove(id: number): Promise<void> {
        await this.loadsRepository.delete(id);
    }
}
