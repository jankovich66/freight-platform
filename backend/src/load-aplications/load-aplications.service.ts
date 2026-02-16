import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadAplication } from './entities/load-aplication.entity';
import { Repository } from 'typeorm';
import { CreateLoadAplicationDto } from './dto/create-load-aplication.dto';
import { UpdateLoadAplicationDto } from './dto/update-load-aplication.dto';

@Injectable()
export class LoadAplicationsService {
    constructor(
        @InjectRepository(LoadAplication)
        private readonly loadAplicationRepository: Repository<LoadAplication>
    ) {}

    async findAll(): Promise<LoadAplication[]> {
        return await this.loadAplicationRepository.find();
    }

    async findOne(id: number): Promise<LoadAplication> {
        const loadAplication = await this.loadAplicationRepository.findOneBy({ id });

        if(!loadAplication) {
            throw new NotFoundException(`Load aplications with id ${ id } not found`);
        }

        return loadAplication;
    }

    async create(createLoadAplicationDto: CreateLoadAplicationDto): Promise<LoadAplication> {
        const loadAplication = this.loadAplicationRepository.create({
            ...createLoadAplicationDto,
            carrier: { id: createLoadAplicationDto.carrierId },
            load: { id: createLoadAplicationDto.loadId }
        });

        return this.loadAplicationRepository.save(loadAplication);
    }

    async update(id: number, updateLoadAplicationDto: UpdateLoadAplicationDto): Promise<LoadAplication> {
        await this.loadAplicationRepository.update(id, updateLoadAplicationDto);
        
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.loadAplicationRepository.delete(id);
    }
}
