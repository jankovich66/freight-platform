import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

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
            const payload = { sub: user.id, email: user.email, phoneNumber: user.phoneNumber, companyName: user.companyName, role: user.role };

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
        const payload = { sub: user.id, email: user.email, phoneNumber: user.phoneNumber, companyName: user.companyName, role: user.role };

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
        const payload = { sub: user.id, email: user.email, phoneNumber: user.phoneNumber, companyName: user.companyName, role: user.role };

        return {
            accessToken: this.jwtService.sign(payload),
            user: this.sanitizeUser(user)
        };
    }
}
