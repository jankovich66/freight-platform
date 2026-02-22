import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<User> {
        return this.authService.validateUser(loginDto);
    }

    @Post('register/carrier')
    registerCarrier(@Body() registerDto: RegisterDto): Promise<User> {
        return this.authService.registerCarrier(registerDto.email, registerDto.password, registerDto.phoneNumber, registerDto.companyName);
    }

    @Post('register/shipper')
    registerShipper(@Body() registerDto: RegisterDto): Promise<User> {
        return this.authService.registerShipper(registerDto.email, registerDto.password, registerDto.phoneNumber, registerDto.companyName);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
