import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserFromRequest } from './interfaces/user-from-request.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    private sanitizeUser(user: User) {
        const { password, ...rest } = user;
        return rest;
    }

    async validateUser({ email, password }: LoginDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);

        if(user && await bcrypt.compare(password, user.password)) {
            // const payload = { sub: user.id, email: user.email, phoneNumber: user.phoneNumber, companyName: user.companyName, role: user.role };
            const payload = { sub: user.id, role: user.role };

            return {
                accessToken: this.jwtService.sign(payload),
                user: this.sanitizeUser(user)
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async registerCarrier(email: string, unhashedPassword: string, phoneNumber: string, companyName: string | undefined): Promise<any> {
        const exists = await this.usersService.findOneByEmail(email);
        if(exists) {
            throw new UnauthorizedException('Email already exists');
        }
        
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(unhashedPassword, SALT_ROUNDS);
        
        const user = await this.usersService.create(email, hashedPassword, phoneNumber, companyName, UserRole.CARRIER);
        // const payload = { sub: user.id, email: user.email, phoneNumber: user.phoneNumber, companyName: user.companyName, role: user.role };
        const payload = { sub: user.id, role: user.role };

        return {
            accessToken: this.jwtService.sign(payload),
            user: this.sanitizeUser(user)
        };
    }

    async registerShipper(email: string, unhashedPassword: string, phoneNumber: string, companyName: string | undefined): Promise<any> {
        const exists = await this.usersService.findOneByEmail(email);
        if(exists) {
            throw new UnauthorizedException('Email already exists');
        }
        
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(unhashedPassword, SALT_ROUNDS);
        
        const user = await this.usersService.create(email, hashedPassword, phoneNumber, companyName, UserRole.SHIPPER);
        // const payload = { sub: user.id, email: user.email, phoneNumber: user.phoneNumber, companyName: user.companyName, role: user.role };
        const payload = { sub: user.id, role: user.role };

        return {
            accessToken: this.jwtService.sign(payload),
            user: this.sanitizeUser(user)
        };
    }

    async updateProfile(user: UserFromRequest, updateProfileDto: UpdateProfileDto) {
        const userFromDatabase = await this.usersService.findOneById(user.id);

        if(!userFromDatabase) {
            throw new NotFoundException('User not found');
        }

        if(updateProfileDto.email && updateProfileDto.email !== userFromDatabase.email) {
            const existingUser = await this.usersService.findOneByEmail(updateProfileDto.email);
            if(existingUser) {
                throw new BadRequestException('Email already in use');
            }
        }

        if(updateProfileDto.password) {
            const SALT_ROUNDS = 10;
            updateProfileDto.password = await bcrypt.hash(updateProfileDto.password, SALT_ROUNDS);
        }

        const updatedUser = await this.usersService.update(user.id, updateProfileDto);

        return {
            user: this.sanitizeUser(updatedUser!)
        }
    }
}
