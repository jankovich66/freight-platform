import { Injectable } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async findOneById(id: number) {
        return await this.usersRepository.findOneBy({ id });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({ email });
    }

    async create(email: string, password: string, phoneNumber: string, companyName: string | undefined, role: UserRole) {
        let user;
        if(companyName === undefined) {
             user = this.usersRepository.create({
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                companyName: '',
                role: role
            });
        }
        else {
            user = this.usersRepository.create({
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                companyName: companyName,
                role: role
            });
        }

        return await this.usersRepository.save(user);
    }

    async update(userId: number, updateProfileDto: UpdateProfileDto) {
        await this.usersRepository.update(userId, updateProfileDto);
        return this.findOneById(userId);
    }
}
