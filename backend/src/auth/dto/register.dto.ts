import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    readonly password: string;

    @IsNotEmpty({ message: 'Phone number cannot be empty' })
    readonly phoneNumber: string;

    @IsNotEmpty({ message: 'Company name cannot be empty' })
    readonly companyName: string;
}
